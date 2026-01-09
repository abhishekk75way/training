package routes

import (
	"authentication/backend/internal/handlers"
	"authentication/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine, h *handlers.AuthHandler) {
	r.POST("/register", h.Register)
	r.POST("/login", h.Login)
	r.POST("/forgot-password", h.ForgotPassword)
	r.POST("/reset-password/:token", h.ResetPassword)

	auth := r.Group("/auth")
	auth.Use(middleware.Auth())
	auth.POST("/change-password", h.ChangePassword)
}
