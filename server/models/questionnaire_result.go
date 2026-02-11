package models

import "time"

type QuestionnaireResult struct {
	ID                 uint      `json:"id" gorm:"primaryKey"`
	QuestionnaireID    uint      `json:"questionnaire_id" gorm:"not null;index"`
	QuestionnaireTitle string    `json:"questionnaire_title"`
	PatientName        string    `json:"patient_name"`
	PatientPhone       string    `json:"patient_phone"`
	PatientAge         int       `json:"patient_age"`
	PatientGender      string    `json:"patient_gender"`
	AnswersJSON        string    `json:"answers_json" gorm:"type:text"`
	TotalScore         float64   `json:"total_score"`
	ResultText         string    `json:"result_text"`
	CreatedAt          time.Time `json:"created_at"`
}

// SubmitResultRequest 公开提交量表结果
type SubmitResultRequest struct {
	PatientName   string `json:"patient_name" binding:"required"`
	PatientPhone  string `json:"patient_phone" binding:"required"`
	PatientAge    int    `json:"patient_age"`
	PatientGender string `json:"patient_gender"`
	AnswersJSON   string `json:"answers_json" binding:"required"`
}
