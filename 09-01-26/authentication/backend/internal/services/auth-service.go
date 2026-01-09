package services

import (
	"authentication/backend/internal/models"
	"authentication/backend/internal/repositories"
	"authentication/backend/internal/utils"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
)

type AuthService struct {
	repo *repositories.UserRepo
}

func NewAuthService(repo *repositories.UserRepo) *AuthService {
	return &AuthService{repo}
}

func (s *AuthService) Register(email, password string) error {
	hash, _ := utils.HashPassword(password)
	return s.repo.Create(&models.User{
		Email:    email,
		Password: hash,
	})
}

func (s *AuthService) Login(email, password string) (string, error) {
	user, err := s.repo.FindByMail(email)
	if err != nil {
		fmt.Println("Login failed: user not found")
		return "", errors.New("invalid credentials")
	}

	if !utils.CheckPassword(password, user.Password) {
		fmt.Println("Login failed: password mismatch")
		return "", errors.New("invalid credentials")
	}

	fmt.Println("Login successful for user:", email)
	return utils.GenerateToken(user.ID)
}

func (s *AuthService) ForgotPassword(email string) (bool, error) {
	user, err := s.repo.FindByMail(email)
	if err != nil {
		return false, nil
	}

	token := uuid.NewString()
	expiry := time.Now().Add(15 * time.Minute)

	user.ResetToken = &token
	user.ResetTokenExpiry = &expiry
	if err := s.repo.Update(user); err != nil {
		return true, err
	}

	// send email
	if err := sendEmail(user.Email, token); err != nil {
		fmt.Println("Failed to send reset password:", err)
		return true, err
	}

	return true, nil
}

func (s *AuthService) ChangePassword(userID uint, oldPassword, newPassword string) error {
	user, err := s.repo.FindByID(userID)
	if err != nil {
		return errors.New("user not found")
	}

	if !utils.CheckPassword(oldPassword, user.Password) {
		return errors.New("old password is incorrect")
	}

	hash, err := utils.HashPassword(newPassword)
	if err != nil {
		return fmt.Errorf("failed to hash new password: %v", err)
	}

	user.Password = hash
	return s.repo.Update(user)
}

// RESET PASSWORD
func (s *AuthService) GetUserByResetToken(token string) (*models.User, error) {
	user, err := s.repo.FindByResetToken(token)
	if err != nil {
		return nil, err
	}

	if user.ResetTokenExpiry == nil || user.ResetTokenExpiry.Before(time.Now()) {
		return nil, errors.New("token expired")
	}

	return user, nil
}

func (s *AuthService) UpdatePassword(userID uint, hashedPassword string) error {
	user, err := s.repo.FindByID(userID)
	if err != nil {
		return errors.New("user not found")
	}

	user.Password = hashedPassword
	return s.repo.Update(user)
}

func (s *AuthService) ClearResetToken(userID uint) error {
	user, err := s.repo.FindByID(userID)
	if err != nil {
		return errors.New("user not found")
	}

	user.ResetToken = nil
	user.ResetTokenExpiry = nil
	return s.repo.Update(user)
}
