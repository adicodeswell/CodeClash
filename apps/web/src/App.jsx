import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AdminRoute } from "./components/AdminRoute.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { ProblemsPage } from "./pages/ProblemsPage.jsx";
import { ProblemDetailPage } from "./pages/ProblemDetailPage.jsx";
import { SubmissionHistoryPage } from "./pages/SubmissionHistoryPage.jsx";
import { SubmissionDetailPage } from "./pages/SubmissionDetailPage.jsx";
import { AdminMonitoringPage } from "./pages/AdminMonitoringPage.jsx";

// Catalog & Platform layout (includes Navbar for authenticated browsing)
function PlatformLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-clash-bg text-clash-text">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Landing page route wrapper: No Navbar, redirects to /problems if already logged in
function LandingPageRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-clash-bg text-clash-muted gap-3">
        <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
        <span className="text-xs font-semibold">Loading CodeClash...</span>
      </div>
    );
  }

  // If already authenticated, jump straight to the catalog
  if (user) {
    return <Navigate to="/problems" replace />;
  }

  // Unauthenticated visitors see the Landing Page with NO Navbar
  return (
    <div className="min-h-screen flex flex-col bg-clash-bg text-clash-text">
      <main className="flex-1 flex flex-col justify-center">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Landing Page - NO NAVBAR */}
          <Route path="/" element={<LandingPageRoute />} />

          {/* Protected Routes - User MUST login before accessing */}
          <Route element={<ProtectedRoute />}>
            {/* Problem Catalog & History with Platform Navbar */}
            <Route element={<PlatformLayout />}>
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/submissions" element={<SubmissionHistoryPage />} />
              <Route path="/submissions/:submissionId" element={<SubmissionDetailPage />} />

              {/* Admin Protected Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/monitoring" element={<AdminMonitoringPage />} />
              </Route>
            </Route>

            {/* Standalone Problem Workspace Arena (custom ArenaHeader instead of Navbar) */}
            <Route path="/problems/:slug" element={<ProblemDetailPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
