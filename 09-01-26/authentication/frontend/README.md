# Authentication Frontend

This is a React TypeScript frontend for a complete authentication system. It connects to a Go backend API and supports registration, login, single active session, password change, forgot password, and reset password via email link.

The app includes protected routes, Axios interceptor for JWT handling, and light/dark theme support.


## Features

* User signup and login
* JWT-based authentication
* Single active login (backend supported)
* Forgot password (email token)
* Reset password
* Change password when logged in
* Protected dashboard
* Axios API service with interceptor
* Environment-based API URL
* Light / Dark theme toggle

## Project Structure

```
src/
 ├─ api/
 │   └─ api.ts
 ├─ components/
 │   ├─ Login.tsx
 │   ├─ Register.tsx
 │   ├─ Dashboard.tsx
 │   ├─ ChangePassword.tsx
 │   ├─ ForgotPassword.tsx
 │   └─ ResetPassword.tsx
 ├─ routes/
 │   └─ App.tsx
 ├─ context/
 │   └─ ThemeContext.tsx
 ├─ styles/
 │   └─ global.css
 ├─ main.tsx
 └─ vite-env.d.ts
```

## Requirements

* Node.js (LTS recommended)
* bun
* Running backend API (Go)

## Environment Variables

Create `.env` in the frontend root:

```
VITE_API_URL=http://localhost:8080
```

Optional additional values:

```
VITE_APP_NAME=Auth System
```

## Install Dependencies

```bash
bun install
```

---

## Run the Development Server

```bash
bun run dev
```

Open browser at:

```
http://localhost:5173
```

## How Authentication Works

* user logs in
* backend generates JWT
* token stored in `localStorage`
* Axios interceptor attaches token to each request
* protected routes verify token
* logout clears token
* single active login handled in backend database

## Theming

* theme values defined in `global.css`
* light/dark stored in document attribute
* toggle implemented using React context

## API Endpoints Used

| Action          | Method | Endpoint                 |
| --------------- | ------ | ------------------------ |
| Signup          | POST   | `/signup`                |
| Login           | POST   | `/login`                 |
| Change password | POST   | `/change-password`       |
| Forgot password | POST   | `/forgot-password`       |
| Reset password  | POST   | `/reset-password/:token` |

## Notes

* Make sure backend CORS allows `http://localhost:5173`
* Use correct `VITE_API_URL`
* Do not expose SMTP credentials in frontend
* Keep JWT in `localStorage` or `cookie` depending on security policy
