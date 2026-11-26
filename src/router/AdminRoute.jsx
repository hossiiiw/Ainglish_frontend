import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app-bg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-app-border border-t-app-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAdminAccess =
    user?.role === "admin" ||
    user?.role === "super_admin" ||
    user?.is_admin === true;

  if (!hasAdminAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
