package models

import "time"

type Appointment struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Name          string    `json:"name" gorm:"not null"`
	Phone         string    `json:"phone" gorm:"not null"`
	Gender        string    `json:"gender"`
	Age           int       `json:"age"`
	Department    string    `json:"department"`
	PreferredTime string    `json:"preferred_time"`
	Symptoms      string    `json:"symptoms"`
	Status        string    `json:"status" gorm:"default:pending"` // pending/confirmed/completed/cancelled
	AdminNotes    string    `json:"admin_notes"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

// CreateAppointmentRequest 公开提交预约的请求体
type CreateAppointmentRequest struct {
	Name          string `json:"name" binding:"required"`
	Phone         string `json:"phone" binding:"required"`
	Gender        string `json:"gender"`
	Age           int    `json:"age"`
	Department    string `json:"department"`
	PreferredTime string `json:"preferred_time"`
	Symptoms      string `json:"symptoms"`
}

// UpdateStatusRequest 更新预约状态
type UpdateStatusRequest struct {
	Status string `json:"status" binding:"required,oneof=pending confirmed completed cancelled"`
}

// UpdateNotesRequest 更新管理员备注
type UpdateNotesRequest struct {
	AdminNotes string `json:"admin_notes"`
}
