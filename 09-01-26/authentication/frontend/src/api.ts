import axios from "axios";

const API_URL = "http://localhost:8080";

interface AuthData {
  email: string;
  password: string;
}

interface ResetData {
  password: string;
}

// Auth
export const signup = (data: AuthData) => axios.post(`${API_URL}/signup`, data);
export const login = (data: AuthData) => axios.post<{ token: string }>(`${API_URL}/login`, data);

// Forgot password (send email)
export const forgotPassword = (data: { email: string }) =>
  axios.post(`${API_URL}/forgot-password`, data);

// Logged-in user changing password
export const changePassword = (data: ResetData) =>
  axios.post(`${API_URL}/change-password`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// Reset password via email token
export const resetPassword = (token: string, data: ResetData) =>
  axios.post(`${API_URL}/reset-password/${token}`, data);
