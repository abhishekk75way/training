package routes

import (
	"authentication/backend/internal/config"
	"authentication/backend/internal/handlers"
	"authentication/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine, h *handlers.AuthHandler) {

	// PUBLIC ROUTES (NO IP BLOCK)
	public := r.Group("/")
	public.Use(middleware.RateLimit(config.Redis))
	{
		public.POST("/register", h.Register)
		public.POST("/login", h.Login)
		public.POST("/forgot-password", h.ForgotPassword)
		public.POST("/reset-password/:token", h.ResetPassword)
	}

	// PROTECTED USER ROUTES
	protected := r.Group("/auth")
	protected.Use(
		middleware.Auth(),
		middleware.IPBlock(config.Redis),
		middleware.RateLimit(config.Redis),
	)
	{
		protected.POST("/change-password", h.ChangePassword)
	}

	// ADMIN ROUTES (BYPASS IP BLOCK)
	admin := r.Group("/admin")
	admin.Use(
		middleware.Auth(),
		middleware.AdminOnly(),
		middleware.RateLimit(config.Redis),
	)
	{
		admin.GET("/blocked-ips", handlers.ListBlockedIPs(config.Redis))
		admin.DELETE("/blocked-ips/:ip", handlers.UnblockIP(config.Redis))
	}
}
