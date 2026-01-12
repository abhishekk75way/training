package utils

import (
	"errors"
	"net/mail"
	"strings"
	"unicode/utf8"
)

// TrimSpaceAll removes leading and trailing spaces from all inputs
func TrimSpaceAll(values ...string) []string {
	trimmed := make([]string, len(values))
	for i, v := range values {
		trimmed[i] = strings.TrimSpace(v)
	}
	return trimmed
}

// ValidateEmail ensures email exists and is valid format
func ValidateEmail(email string) (string, error) {
	email = strings.TrimSpace(email)

	if email == "" {
		return "", errors.New("email is required")
	}

	_, err := mail.ParseAddress(email)
	if err != nil {
		return "", errors.New("invalid email format")
	}

	return email, nil
}

// ValidatePassword enforces basic password rules
func ValidatePassword(password string) (string, error) {
	password = strings.TrimSpace(password)

	if password == "" {
		return "", errors.New("password is required")
	}

	if utf8.RuneCountInString(password) < 4 {
		return "", errors.New("password must be at least 4 characters")
	}

	return password, nil
}

// ValidateConfirmPassword ensures passwords match
func ValidateConfirmPassword(password, confirm string) error {
	if strings.TrimSpace(password) != strings.TrimSpace(confirm) {
		return errors.New("passwords do not match")
	}
	return nil
}

// ValidateToken checks reset/JWT token string
func ValidateToken(token string) (string, error) {
	token = strings.TrimSpace(token)

	if token == "" {
		return "", errors.New("token is required")
	}

	if len(token) < 10 {
		return "", errors.New("invalid token")
	}

	return token, nil
}

// ValidateRequiredString checks any required text input
func ValidateRequiredString(name, value string) (string, error) {
	value = strings.TrimSpace(value)

	if value == "" {
		return "", errors.New(name + " is required")
	}

	return value, nil
}
