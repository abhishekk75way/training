export interface JwtPayload {
  user_id: number;
  role: "admin" | "user";
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): JwtPayload => {
  const base64 = token.split(".")[1];
  return JSON.parse(atob(base64));
};
