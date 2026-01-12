export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  return Boolean(getToken());
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.replace("/login");
};

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as User) : null;
};
