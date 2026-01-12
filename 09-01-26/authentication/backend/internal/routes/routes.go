package routes

import (
	"authentication/backend/internal/config"
	"authentication/backend/internal/handlers"
	"authentication/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine, h *handlers.AuthHandler) {

	// PUBLIC ROUTES (NO RATE LIMIT, NO BLOCK)
	public := r.Group("/")
	{
		public.POST("/register", h.Register)
		public.POST("/login", h.Login)
		public.POST("/forgot-password", h.ForgotPassword)
		public.POST("/reset-password/:token", h.ResetPassword)
	}

	// AUTH TEST
	authTest := r.Group("/test/auth")
	authTest.Use(middleware.Auth())
	{
		authTest.GET("", handlers.TestAuth)
	}

	// AUTHENTICATED USER ROUTES
	protected := r.Group("/auth")
	protected.Use(
		middleware.Auth(),
		middleware.RateLimit(config.Redis),
		middleware.IPBlock(config.Redis),
	)
	{
		protected.POST("/change-password", h.ChangePassword)
		protected.GET("/test", handlers.TestProtected)
	}

	// ADMIN ROUTES
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
