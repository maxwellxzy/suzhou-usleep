package handlers

import (
	"encoding/json"
	"log"

	"usleep-server/database"
	"usleep-server/models"
	"usleep-server/utils"

	"github.com/gin-gonic/gin"
)

// QuestionOption 选项结构
type QuestionOption struct {
	Label string  `json:"label"`
	Value string  `json:"value"`
	Score float64 `json:"score"`
}

// Question 题目结构
type Question struct {
	ID       string           `json:"id"`
	Text     string           `json:"text"`
	Type     string           `json:"type"` // single_choice / multi_choice / rating
	Required bool             `json:"required"`
	Options  []QuestionOption `json:"options"`
}

// ScoringRule 计分规则
type ScoringRule struct {
	Method string        `json:"method"` // sum
	Ranges []ScoreRange  `json:"ranges"`
}

// ScoreRange 分数区间
type ScoreRange struct {
	Min   float64 `json:"min"`
	Max   float64 `json:"max"`
	Label string  `json:"label"`
}

// Answer 作答结构
type Answer struct {
	QuestionID string   `json:"question_id"`
	Values     []string `json:"values"` // 选中的 value 列表
}

// ListQuestionnairesPublic 公开获取启用的量表列表
func ListQuestionnairesPublic(c *gin.Context) {
	var questionnaires []models.Questionnaire
	database.DB.Where("is_active = ?", true).
		Select("id, title, description, category, share_code, created_at").
		Order("created_at DESC").
		Find(&questionnaires)

	utils.Success(c, questionnaires)
}

// GetQuestionnairePublic 公开获取量表详情（通过 share_code）
func GetQuestionnairePublic(c *gin.Context) {
	shareCode := c.Param("share_code")
	var questionnaire models.Questionnaire
	if err := database.DB.Where("share_code = ? AND is_active = ?", shareCode, true).First(&questionnaire).Error; err != nil {
		utils.NotFound(c, "量表不存在或已停用")
		return
	}

	utils.Success(c, questionnaire)
}

// SubmitQuestionnaireResult 公开提交量表结果
func SubmitQuestionnaireResult(c *gin.Context) {
	shareCode := c.Param("share_code")

	// 查找量表
	var questionnaire models.Questionnaire
	if err := database.DB.Where("share_code = ? AND is_active = ?", shareCode, true).First(&questionnaire).Error; err != nil {
		utils.NotFound(c, "量表不存在或已停用")
		return
	}

	var req models.SubmitResultRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请填写必要信息")
		return
	}

	// 手机号验证
	if !phoneRegex.MatchString(req.PatientPhone) {
		utils.BadRequest(c, "请输入有效的手机号")
		return
	}

	// 计算得分
	totalScore, resultText := calculateScore(questionnaire.QuestionsJSON, questionnaire.ScoringJSON, req.AnswersJSON)

	result := models.QuestionnaireResult{
		QuestionnaireID:    questionnaire.ID,
		QuestionnaireTitle: questionnaire.Title,
		PatientName:        req.PatientName,
		PatientPhone:       req.PatientPhone,
		PatientAge:         req.PatientAge,
		PatientGender:      req.PatientGender,
		AnswersJSON:        req.AnswersJSON,
		TotalScore:         totalScore,
		ResultText:         resultText,
	}

	if err := database.DB.Create(&result).Error; err != nil {
		utils.InternalError(c, "提交失败，请稍后重试")
		return
	}

	utils.Success(c, gin.H{
		"id":          result.ID,
		"total_score": result.TotalScore,
		"result_text": result.ResultText,
		"message":     "量表提交成功",
	})
}

// calculateScore 服务端计算量表得分
func calculateScore(questionsJSON, scoringJSON, answersJSON string) (float64, string) {
	var questions []Question
	var scoring ScoringRule
	var answers []Answer

	if err := json.Unmarshal([]byte(questionsJSON), &questions); err != nil {
		log.Printf("解析题目JSON失败: %v", err)
		return 0, "评分计算异常"
	}
	if err := json.Unmarshal([]byte(scoringJSON), &scoring); err != nil {
		log.Printf("解析计分规则JSON失败: %v", err)
		return 0, "评分计算异常"
	}
	if err := json.Unmarshal([]byte(answersJSON), &answers); err != nil {
		log.Printf("解析作答JSON失败: %v", err)
		return 0, "评分计算异常"
	}

	// 构建题目选项的分数映射
	optionScoreMap := make(map[string]map[string]float64) // questionID -> value -> score
	for _, q := range questions {
		scoreMap := make(map[string]float64)
		for _, opt := range q.Options {
			scoreMap[opt.Value] = opt.Score
		}
		optionScoreMap[q.ID] = scoreMap
	}

	// 累加得分
	var totalScore float64
	for _, answer := range answers {
		if scoreMap, ok := optionScoreMap[answer.QuestionID]; ok {
			for _, value := range answer.Values {
				if score, ok := scoreMap[value]; ok {
					totalScore += score
				}
			}
		}
	}

	// 匹配结果区间
	resultText := "暂无评价"
	for _, r := range scoring.Ranges {
		if totalScore >= r.Min && totalScore <= r.Max {
			resultText = r.Label
			break
		}
	}

	return totalScore, resultText
}
