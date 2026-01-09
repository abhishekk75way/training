package services

import (
	"fmt"
	"os"
	"strconv"

	"gopkg.in/gomail.v2"
)

func sendEmail(toEmail, token string) error {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPortStr := os.Getenv("SMTP_PORT")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASSWORD")
	fromEmail := os.Getenv("EMAIL_FROM")
	frontendURL := os.Getenv("FRONTEND_URL")

	// convert port from string → int
	smtpPort, _ := strconv.Atoi(smtpPortStr)

	m := gomail.NewMessage()
	m.SetHeader("From", fromEmail)
	m.SetHeader("To", toEmail)
	m.SetHeader("Subject", "Password Reset Request")
	m.SetBody(
		"text/plain",
		fmt.Sprintf(
			"Click this link to reset your password:\n%s/reset-password?token=%s",
			frontendURL,
			token,
		),
	)

	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)

	return d.DialAndSend(m)
}
