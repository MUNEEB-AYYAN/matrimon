import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protect routes that are only accessible to admin users
export default function AdminRoute({ children }) {
  const { user, token } = useAuth();

  // If not logged in or not admin, redirect to login
  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
