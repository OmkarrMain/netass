import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center text-muted">Loading session...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}
