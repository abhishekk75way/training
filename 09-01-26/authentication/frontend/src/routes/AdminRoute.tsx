import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { decodeToken } from "../utils/jwt";

interface Props {
  children: ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const payload = decodeToken(token);

  console.log("ADMIN PAYLOAD:", payload);

  if (!payload.role) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
