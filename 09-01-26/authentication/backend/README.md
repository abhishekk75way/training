
# Authentication System - Golang 

This project is a full-stack authentication system built with:

* Backend: Go (Gin, GORM, PostgreSQL)
* Authentication: JWT
* Email service via SMTP

The system supports user registration, login, password reset via email, password hashing, and token-based authentication. It includes validation utilities, global error handling, and environment-based configuration.

## Project Structure

```
authentication/
│
├── backend/
│   ├── cmd/
│   │   └── main.go              - Application entrypoint
│   ├── internal/
│   │   ├── config/              - Database connection setup
│   │   ├── handlers/            - HTTP handlers (controllers)
│   │   ├── middleware/          - Authentication and error middlewares
│   │   ├── models/              - Database models
│   │   ├── repositories/        - Data access layer
│   │   ├── routes/              - API routes
│   │   ├── services/            - Business logic
│   │   └── utils/               - Helper and validation functions
│   └── go.mod
│
└── frontend/
    - React application code
```

## Features

Completed:

* User registration and login
* JWT authentication
* Password hashing using bcrypt
* Forgot and reset password using tokens
* Token expiry and validation
* Reset token invalidation after use
* CORS configuration controlled by environment variables
* Global error handling middleware
* Request validation (trimming, required fields, password length)

## Backend Setup (Go)

### 1. Clone the repository

```
git clone https://github.com/abhishekk75way/training
cd authentication/backend
```

### 2. Create `.env` file in the backend folder

```
POSTGRES_STR="host=localhost user=postgres password=postgres dbname=authdb port=5432 sslmode=disable"
PORT="8080"

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Note:

* Use a Gmail App Password instead of the real account password.

### 3. Create PostgreSQL database

Create a database named:

```
authdb
```

### 4. Install Go dependencies

```
go mod tidy
```

### 5. Run the backend server

```
go run cmd/main.go
```

Default server URL:

```
http://localhost:8080
```
