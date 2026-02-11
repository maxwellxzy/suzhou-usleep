package models

import "time"

type Questionnaire struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Title         string    `json:"title" gorm:"not null"`
	Description   string    `json:"description"`
	Category      string    `json:"category"` // 睡眠/抑郁/焦虑等
	QuestionsJSON string    `json:"questions_json" gorm:"type:text"`
	ScoringJSON   string    `json:"scoring_json" gorm:"type:text"`
	ShareCode     string    `json:"share_code" gorm:"unique"`
	IsActive      bool      `json:"is_active" gorm:"default:true"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

// CreateQuestionnaireRequest 创建量表请求
type CreateQuestionnaireRequest struct {
	Title         string `json:"title" binding:"required"`
	Description   string `json:"description"`
	Category      string `json:"category"`
	QuestionsJSON string `json:"questions_json" binding:"required"`
	ScoringJSON   string `json:"scoring_json" binding:"required"`
	IsActive      *bool  `json:"is_active"`
}

// UpdateQuestionnaireRequest 更新量表请求
type UpdateQuestionnaireRequest struct {
	Title         string `json:"title"`
	Description   string `json:"description"`
	Category      string `json:"category"`
	QuestionsJSON string `json:"questions_json"`
	ScoringJSON   string `json:"scoring_json"`
	IsActive      *bool  `json:"is_active"`
}
