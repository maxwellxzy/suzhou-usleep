package routes

import (
	"usleep-server/handlers"
	"usleep-server/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// CORS
	r.Use(middleware.CORSMiddleware())

	api := r.Group("/api")
	{
		// === 公开接口（无需认证）===
		api.POST("/appointments", handlers.CreateAppointment)
		api.GET("/questionnaires", handlers.ListQuestionnairesPublic)
		api.GET("/questionnaires/:share_code", handlers.GetQuestionnairePublic)
		api.POST("/questionnaires/:share_code/submit", handlers.SubmitQuestionnaireResult)

		// === 认证接口 ===
		api.POST("/auth/login", handlers.Login)

		// === 管理接口（需 JWT）===
		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware())
		{
			// 仪表盘
			admin.GET("/dashboard", handlers.Dashboard)

			// 预约管理
			admin.GET("/appointments", handlers.ListAppointments)
			admin.PUT("/appointments/:id/status", handlers.UpdateAppointmentStatus)
			admin.PUT("/appointments/:id/notes", handlers.UpdateAppointmentNotes)
			admin.DELETE("/appointments/:id", handlers.DeleteAppointment)
			admin.GET("/appointments/export", handlers.ExportAppointments)

			// 量表管理
			admin.GET("/questionnaires", handlers.ListQuestionnairesAdmin)
			admin.POST("/questionnaires", handlers.CreateQuestionnaire)
			admin.GET("/questionnaires/:id", handlers.GetQuestionnaireAdmin)
			admin.PUT("/questionnaires/:id", handlers.UpdateQuestionnaire)
			admin.DELETE("/questionnaires/:id", handlers.DeleteQuestionnaire)

			// 量表结果
			admin.GET("/results", handlers.ListResults)
			admin.GET("/results/:id", handlers.GetResult)
			admin.GET("/results/export", handlers.ExportResults)
		}
	}
}
