import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AuthData {
  email: string;
  password: string;
}

interface ResetData {
  password: string;
}

// Signup
export const signup = (data: AuthData) =>
  api.post("/register", data);

// Login
export const login = (data: AuthData) =>
  api.post<{ token: string }>("/login", data);

// Forgot password
export const forgotPassword = (data: { email: string }) =>
  api.post("/forgot-password", data);

// Change password
export const changePassword = (data: ResetData) =>
  api.post("/change-password", data);

// Reset password via email token
export const resetPassword = (token: string, data: ResetData) =>
  api.post(`/reset-password/${token}`, data);

export default api;
