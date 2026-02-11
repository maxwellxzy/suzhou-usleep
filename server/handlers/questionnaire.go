package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"strconv"

	"usleep-server/database"
	"usleep-server/models"
	"usleep-server/utils"

	"github.com/gin-gonic/gin"
)

// generateShareCode 生成 8 位随机分享短码
func generateShareCode() string {
	bytes := make([]byte, 4)
	rand.Read(bytes)
	return hex.EncodeToString(bytes)
}

// ListQuestionnairesAdmin 管理端获取量表列表
func ListQuestionnairesAdmin(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(c.DefaultQuery("size", "20"))
	category := c.Query("category")

	if page < 1 {
		page = 1
	}
	if size < 1 || size > 100 {
		size = 20
	}

	query := database.DB.Model(&models.Questionnaire{})
	if category != "" {
		query = query.Where("category = ?", category)
	}

	var total int64
	query.Count(&total)

	var questionnaires []models.Questionnaire
	query.Order("created_at DESC").
		Offset((page - 1) * size).
		Limit(size).
		Find(&questionnaires)

	utils.SuccessPaged(c, questionnaires, total, page, size)
}

// CreateQuestionnaire 管理端创建量表
func CreateQuestionnaire(c *gin.Context) {
	var req models.CreateQuestionnaireRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请填写必要信息")
		return
	}

	isActive := true
	if req.IsActive != nil {
		isActive = *req.IsActive
	}

	questionnaire := models.Questionnaire{
		Title:         req.Title,
		Description:   req.Description,
		Category:      req.Category,
		QuestionsJSON: req.QuestionsJSON,
		ScoringJSON:   req.ScoringJSON,
		ShareCode:     generateShareCode(),
		IsActive:      isActive,
	}

	if err := database.DB.Create(&questionnaire).Error; err != nil {
		utils.InternalError(c, "创建量表失败")
		return
	}

	utils.Success(c, questionnaire)
}

// GetQuestionnaireAdmin 管理端获取量表详情
func GetQuestionnaireAdmin(c *gin.Context) {
	id := c.Param("id")
	var questionnaire models.Questionnaire
	if err := database.DB.First(&questionnaire, id).Error; err != nil {
		utils.NotFound(c, "量表不存在")
		return
	}

	utils.Success(c, questionnaire)
}

// UpdateQuestionnaire 管理端更新量表
func UpdateQuestionnaire(c *gin.Context) {
	id := c.Param("id")
	var questionnaire models.Questionnaire
	if err := database.DB.First(&questionnaire, id).Error; err != nil {
		utils.NotFound(c, "量表不存在")
		return
	}

	var req models.UpdateQuestionnaireRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请求格式错误")
		return
	}

	updates := map[string]interface{}{}
	if req.Title != "" {
		updates["title"] = req.Title
	}
	if req.Description != "" {
		updates["description"] = req.Description
	}
	if req.Category != "" {
		updates["category"] = req.Category
	}
	if req.QuestionsJSON != "" {
		updates["questions_json"] = req.QuestionsJSON
	}
	if req.ScoringJSON != "" {
		updates["scoring_json"] = req.ScoringJSON
	}
	if req.IsActive != nil {
		updates["is_active"] = *req.IsActive
	}

	database.DB.Model(&questionnaire).Updates(updates)
	database.DB.First(&questionnaire, id)

	utils.Success(c, questionnaire)
}

// DeleteQuestionnaire 管理端删除量表
func DeleteQuestionnaire(c *gin.Context) {
	id := c.Param("id")
	result := database.DB.Delete(&models.Questionnaire{}, id)
	if result.RowsAffected == 0 {
		utils.NotFound(c, "量表不存在")
		return
	}

	utils.SuccessMessage(c, "删除成功")
}
