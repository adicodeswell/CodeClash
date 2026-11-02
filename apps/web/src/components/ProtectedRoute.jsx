import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-clash-bg text-clash-muted gap-3">
        <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
        <span className="text-xs font-semibold">Verifying session...</span>
      </div>
    );
  }

  if (!user) {
    // Redirect to landing page and preserve attempted destination
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
