package services

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

func sendEmail(toEmail, token string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", "abhi.75way@gmail.com")
	m.SetHeader("To", toEmail)
	m.SetHeader("Subject", "Password Reset Request")
	m.SetBody("text/plain", fmt.Sprintf("Click this link to reset your password:\nhttp://localhost:8080/reset-password?token=%s", token))

	d := gomail.NewDialer("smtp.example.com", 587, "abhi.75way@gmail.com", "password")

	return d.DialAndSend(m)
}
