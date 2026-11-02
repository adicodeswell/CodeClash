import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export function AuthForm({ onSuccess }) {
  const { login, signup, authError, clearError } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (newMode) => {
    setMode(newMode);
    setLocalError("");
    clearError();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    // Client-side quick validation matching Zod schemas
    if (mode === "signup") {
      if (!formData.username || formData.username.trim().length < 3) {
        setLocalError("Username must be at least 3 characters");
        return;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
        setLocalError("Username can only contain letters, numbers, and underscores");
        return;
      }
    }

    if (!formData.email || !formData.email.includes("@")) {
      setLocalError("Please enter a valid email address");
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login({ email: formData.email, password: formData.password });
      } else {
        await signup({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });
      }
      if (onSuccess) {
        onSuccess();
      } else {
        const dest = location.state?.from?.pathname || "/problems";
        navigate(dest, { replace: true });
      }
    } catch {
      // Auth error is automatically populated in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = localError || authError;

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-clash-card/80 border border-clash-border backdrop-blur-xl shadow-2xl shadow-black/60 text-left">
      {/* Mode Tabs */}
      <div className="flex bg-clash-bg/70 p-1 rounded-xl border border-clash-border mb-6">
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition cursor-pointer ${
            mode === "login"
              ? "bg-clash-surface text-clash-text shadow-sm"
              : "text-clash-muted hover:text-clash-text"
          }`}
          onClick={() => handleTabChange("login")}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition cursor-pointer ${
            mode === "signup"
              ? "bg-clash-surface text-clash-text shadow-sm"
              : "text-clash-muted hover:text-clash-text"
          }`}
          onClick={() => handleTabChange("signup")}
        >
          Create Account
        </button>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-clash-text tracking-tight mb-1.5">
          {mode === "login" ? "Welcome Back to CodeClash" : "Join the Arena"}
        </h3>
        <p className="text-sm text-clash-muted leading-relaxed">
          {mode === "login"
            ? "Enter your credentials to access problems, battles, and solutions."
            : "Compete against engineers and master data structures & algorithms."}
        </p>
      </div>

      {/* Error alert */}
      {activeError && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-status-error/10 border border-status-error/25 text-red-300 text-xs sm:text-sm mb-5">
          <AlertCircle size={18} className="shrink-0 text-status-error" />
          <span>{activeError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="username" className="text-xs font-semibold text-clash-muted mb-1.5 block">
              Username
            </label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3.5 text-clash-subtle pointer-events-none" />
              <input
                id="username"
                name="username"
                type="text"
                placeholder="coding_ninja"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
                className="w-full py-2.5 pl-10 pr-4 bg-clash-bg/80 border border-clash-border rounded-xl text-clash-text text-sm placeholder:text-clash-subtle focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="text-xs font-semibold text-clash-muted mb-1.5 block">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail size={16} className="absolute left-3.5 text-clash-subtle pointer-events-none" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full py-2.5 pl-10 pr-4 bg-clash-bg/80 border border-clash-border rounded-xl text-clash-text text-sm placeholder:text-clash-subtle focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-clash-muted block">
              Password
            </label>
            <span className="text-[11px] text-clash-subtle">Min. 8 characters</span>
          </div>
          <div className="relative flex items-center">
            <Lock size={16} className="absolute left-3.5 text-clash-subtle pointer-events-none" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              className="w-full py-2.5 pl-10 pr-10 bg-clash-bg/80 border border-clash-border rounded-xl text-clash-text text-sm placeholder:text-clash-subtle focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition"
            />
            <button
              type="button"
              className="absolute right-3 text-clash-subtle hover:text-clash-text transition cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{mode === "login" ? "Sign In to CodeClash" : "Create Account"}</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Footer Switch */}
      <div className="mt-6 text-center text-xs sm:text-sm text-clash-muted">
        <p>
          {mode === "login" ? "New to CodeClash? " : "Already have an account? "}
          <button
            type="button"
            className="text-brand-primary font-semibold underline underline-offset-4 hover:text-brand-secondary cursor-pointer transition"
            onClick={() => handleTabChange(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Create an account" : "Sign in here"}
          </button>
        </p>
      </div>
    </div>
  );
}
