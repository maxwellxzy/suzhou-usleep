package handlers

import (
	"encoding/csv"
	"fmt"
	"regexp"
	"strconv"

	"usleep-server/database"
	"usleep-server/models"
	"usleep-server/utils"

	"github.com/gin-gonic/gin"
)

var phoneRegex = regexp.MustCompile(`^1[3-9]\d{9}$`)

// CreateAppointment 公开提交预约（无需认证）
func CreateAppointment(c *gin.Context) {
	var req models.CreateAppointmentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请填写必要信息")
		return
	}

	// 手机号格式验证
	if !phoneRegex.MatchString(req.Phone) {
		utils.BadRequest(c, "请输入有效的手机号")
		return
	}

	appointment := models.Appointment{
		Name:          req.Name,
		Phone:         req.Phone,
		Gender:        req.Gender,
		Age:           req.Age,
		Department:    req.Department,
		PreferredTime: req.PreferredTime,
		Symptoms:      req.Symptoms,
		Status:        "pending",
	}

	if err := database.DB.Create(&appointment).Error; err != nil {
		utils.InternalError(c, "预约提交失败，请稍后重试")
		return
	}

	utils.Success(c, gin.H{
		"id":      appointment.ID,
		"message": "预约提交成功，我们会尽快与您联系",
	})
}

// ListAppointments 管理端获取预约列表（分页+筛选）
func ListAppointments(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(c.DefaultQuery("size", "20"))
	status := c.Query("status")
	keyword := c.Query("keyword")

	if page < 1 {
		page = 1
	}
	if size < 1 || size > 100 {
		size = 20
	}

	query := database.DB.Model(&models.Appointment{})

	if status != "" {
		query = query.Where("status = ?", status)
	}
	if keyword != "" {
		like := "%" + keyword + "%"
		query = query.Where("name LIKE ? OR phone LIKE ?", like, like)
	}

	var total int64
	query.Count(&total)

	var appointments []models.Appointment
	query.Order("created_at DESC").
		Offset((page - 1) * size).
		Limit(size).
		Find(&appointments)

	utils.SuccessPaged(c, appointments, total, page, size)
}

// UpdateAppointmentStatus 更新预约状态
func UpdateAppointmentStatus(c *gin.Context) {
	id := c.Param("id")
	var req models.UpdateStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请提供有效的状态值")
		return
	}

	result := database.DB.Model(&models.Appointment{}).Where("id = ?", id).Update("status", req.Status)
	if result.RowsAffected == 0 {
		utils.NotFound(c, "预约不存在")
		return
	}

	utils.SuccessMessage(c, "状态更新成功")
}

// UpdateAppointmentNotes 更新管理员备注
func UpdateAppointmentNotes(c *gin.Context) {
	id := c.Param("id")
	var req models.UpdateNotesRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.BadRequest(c, "请求格式错误")
		return
	}

	result := database.DB.Model(&models.Appointment{}).Where("id = ?", id).Update("admin_notes", req.AdminNotes)
	if result.RowsAffected == 0 {
		utils.NotFound(c, "预约不存在")
		return
	}

	utils.SuccessMessage(c, "备注更新成功")
}

// DeleteAppointment 删除预约
func DeleteAppointment(c *gin.Context) {
	id := c.Param("id")
	result := database.DB.Delete(&models.Appointment{}, id)
	if result.RowsAffected == 0 {
		utils.NotFound(c, "预约不存在")
		return
	}

	utils.SuccessMessage(c, "删除成功")
}

// ExportAppointments 导出预约数据 CSV
func ExportAppointments(c *gin.Context) {
	status := c.Query("status")
	keyword := c.Query("keyword")

	query := database.DB.Model(&models.Appointment{})

	if status != "" {
		query = query.Where("status = ?", status)
	}
	if keyword != "" {
		like := "%" + keyword + "%"
		query = query.Where("name LIKE ? OR phone LIKE ?", like, like)
	}

	var appointments []models.Appointment
	query.Order("created_at DESC").Find(&appointments)

	c.Header("Content-Type", "text/csv; charset=utf-8")
	c.Header("Content-Disposition", "attachment; filename=appointments.csv")
	c.Writer.Write([]byte("\xEF\xBB\xBF")) // BOM

	writer := csv.NewWriter(c.Writer)
	defer writer.Flush()

	writer.Write([]string{"ID", "姓名", "手机号", "性别", "年龄", "科室", "期望时间", "症状", "状态", "备注", "提交时间"})

	for _, a := range appointments {
		statusText := "待处理"
		switch a.Status {
		case "confirmed":
			statusText = "已确认"
		case "completed":
			statusText = "已完成"
		case "cancelled":
			statusText = "已取消"
		}

		writer.Write([]string{
			fmt.Sprintf("%d", a.ID),
			a.Name,
			a.Phone,
			a.Gender,
			strconv.Itoa(a.Age),
			a.Department,
			a.PreferredTime,
			a.Symptoms,
			statusText,
			a.AdminNotes,
			a.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}
}
