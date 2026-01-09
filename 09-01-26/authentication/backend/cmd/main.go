package main

import (
	"authentication/backend/internal/config"
	"authentication/backend/internal/handlers"
	"authentication/backend/internal/models"
	"authentication/backend/internal/repositories"
	"authentication/backend/internal/routes"
	"authentication/backend/internal/services"

	"github.com/gin-contrib/cors"

	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	str := os.Getenv("POSTGRES_STR")
	if str == "" {
		str = "host=localhost user=postgres password=postgres dbname=authdb port=5432 sslmode=disable"
	}

	err := config.Connect(str)
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	// Automigrate User Model
	if err := config.DB.AutoMigrate(&models.User{}); err != nil {
		log.Fatal("AutoMigrate failed:", err)
	}

	userRepo := repositories.NewUserRepo(config.DB)
	authService := services.NewAuthService(userRepo)
	authHandler := handlers.NewAuthHandler(authService)

	r := gin.Default()

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // your React app URL
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.Setup(r, authHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("Server running on port", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
