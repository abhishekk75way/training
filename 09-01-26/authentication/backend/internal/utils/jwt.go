package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var JWTSecret = []byte("jwt-secret")

func GenerateToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWTSecret)
}

func VerifyToken(token string) error {
	tokenstr, err := jwt.Parse(token, func(t *jwt.Token) (any, error) {
		return JWTSecret, nil
	})

	if err != nil {
		return err
	}
	if !tokenstr.Valid {
		return fmt.Errorf("Invalid Token!")
	}
	return nil
}
