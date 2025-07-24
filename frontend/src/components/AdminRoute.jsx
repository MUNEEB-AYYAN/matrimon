// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, token } = useAuth();

  if (!token || !user?.isAdmin) return <Navigate to="/login" />;
  return children;
}
