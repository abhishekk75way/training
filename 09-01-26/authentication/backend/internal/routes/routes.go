package routes

import (
	"authentication/backend/internal/config"
	"authentication/backend/internal/handlers"
	"authentication/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine, h *handlers.AuthHandler) {

	r.POST("/register", h.Register)
	r.POST("/login", h.Login)
	r.POST("/forgot-password", h.ForgotPassword)
	r.POST("/reset-password/:token", h.ResetPassword)
	r.GET("/reset-password/:token", h.ValidateResetToken)

	auth := r.Group("/auth")
	auth.Use(middleware.Auth())
	{
		auth.POST("/change-password", h.ChangePassword)
	}

	admin := r.Group("/admin")
	admin.Use(
		middleware.Auth(),
		middleware.AdminOnly(),
	)
	{
		admin.GET("/blocked-ips", handlers.ListBlockedIPs(config.Redis))
		admin.DELETE("/blocked-ips/:ip", handlers.UnblockIP(config.Redis))
	}
}
