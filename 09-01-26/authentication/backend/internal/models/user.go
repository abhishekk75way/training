package models

import "time"

type User struct {
	ID               uint   `gorm:"primaryKey"`
	Email            string `gorm:"uniqueText; not null"`
	Password         string `gorm:"not null"`
	ResetToken       *string
	ResetTokenExpiry *time.Time
	CreatedAt        *time.Time
}
