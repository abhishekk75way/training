export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return Boolean(token);
};

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
