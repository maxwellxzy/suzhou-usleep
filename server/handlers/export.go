package handlers

import (
	"encoding/csv"
	"fmt"
	"strconv"

	"usleep-server/database"
	"usleep-server/models"
	"usleep-server/utils"

	"github.com/gin-gonic/gin"
)

// ListResults 管理端获取量表结果列表
func ListResults(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(c.DefaultQuery("size", "20"))
	questionnaireID := c.Query("questionnaire_id")

	if page < 1 {
		page = 1
	}
	if size < 1 || size > 100 {
		size = 20
	}

	query := database.DB.Model(&models.QuestionnaireResult{})
	if questionnaireID != "" {
		query = query.Where("questionnaire_id = ?", questionnaireID)
	}

	var total int64
	query.Count(&total)

	var results []models.QuestionnaireResult
	query.Order("created_at DESC").
		Offset((page - 1) * size).
		Limit(size).
		Find(&results)

	utils.SuccessPaged(c, results, total, page, size)
}

// GetResult 管理端获取结果详情
func GetResult(c *gin.Context) {
	id := c.Param("id")
	var result models.QuestionnaireResult
	if err := database.DB.First(&result, id).Error; err != nil {
		utils.NotFound(c, "结果不存在")
		return
	}

	utils.Success(c, result)
}

// ExportResults 导出量表结果为 CSV
func ExportResults(c *gin.Context) {
	questionnaireID := c.Query("questionnaire_id")

	query := database.DB.Model(&models.QuestionnaireResult{})
	if questionnaireID != "" {
		query = query.Where("questionnaire_id = ?", questionnaireID)
	}

	var results []models.QuestionnaireResult
	query.Order("created_at DESC").Find(&results)

	c.Header("Content-Type", "text/csv; charset=utf-8")
	c.Header("Content-Disposition", "attachment; filename=questionnaire_results.csv")

	// 写入 UTF-8 BOM（Excel 兼容）
	c.Writer.Write([]byte("\xEF\xBB\xBF"))

	writer := csv.NewWriter(c.Writer)
	defer writer.Flush()

	// 表头
	writer.Write([]string{"ID", "量表名称", "姓名", "手机号", "年龄", "性别", "总分", "结果", "提交时间"})

	for _, r := range results {
		writer.Write([]string{
			fmt.Sprintf("%d", r.ID),
			r.QuestionnaireTitle,
			r.PatientName,
			r.PatientPhone,
			strconv.Itoa(r.PatientAge),
			r.PatientGender,
			fmt.Sprintf("%.1f", r.TotalScore),
			r.ResultText,
			r.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}
}
