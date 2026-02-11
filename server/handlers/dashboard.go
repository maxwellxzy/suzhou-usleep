package handlers

import (
	"time"

	"usleep-server/database"
	"usleep-server/models"
	"usleep-server/utils"

	"github.com/gin-gonic/gin"
)

type DashboardData struct {
	TotalAppointments   int64            `json:"total_appointments"`
	PendingAppointments int64            `json:"pending_appointments"`
	TodayAppointments   int64            `json:"today_appointments"`
	TotalQuestionnaires int64            `json:"total_questionnaires"`
	TotalResults        int64            `json:"total_results"`
	RecentAppointments  []models.Appointment `json:"recent_appointments"`
	RecentResults       []models.QuestionnaireResult `json:"recent_results"`
}

// Dashboard 仪表盘统计
func Dashboard(c *gin.Context) {
	var data DashboardData

	database.DB.Model(&models.Appointment{}).Count(&data.TotalAppointments)
	database.DB.Model(&models.Appointment{}).Where("status = ?", "pending").Count(&data.PendingAppointments)

	today := time.Now().Format("2006-01-02")
	database.DB.Model(&models.Appointment{}).Where("DATE(created_at) = ?", today).Count(&data.TodayAppointments)

	database.DB.Model(&models.Questionnaire{}).Count(&data.TotalQuestionnaires)
	database.DB.Model(&models.QuestionnaireResult{}).Count(&data.TotalResults)

	// 最近 5 条预约
	database.DB.Order("created_at DESC").Limit(5).Find(&data.RecentAppointments)

	// 最近 5 条量表结果
	database.DB.Order("created_at DESC").Limit(5).Find(&data.RecentResults)

	utils.Success(c, data)
}
