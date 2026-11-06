import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export function AdminRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-clash-bg text-clash-muted gap-3">
        <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        <span className="text-xs font-semibold">Verifying permissions...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto my-auto">
        <div className="w-12 h-12 rounded-xl bg-status-error/10 border border-status-error/30 text-rose-400 flex items-center justify-center mb-4">
          <ShieldAlert size={24} />
        </div>
        <h2 className="text-xl font-bold text-clash-text mb-2">Access Denied</h2>
        <p className="text-xs sm:text-sm text-clash-muted mb-6">
          Administrator privileges are required to access CodeClash Telemetry &amp; System Monitoring.
        </p>
        <Link
          to="/problems"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Problems</span>
        </Link>
      </div>
    );
  }

  return <Outlet />;
}

export default AdminRoute;
