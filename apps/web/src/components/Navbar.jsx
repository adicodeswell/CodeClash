import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { User, LogOut, Code2, History } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-clash-border bg-clash-bg/85 backdrop-blur-md select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand & Nav */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary group-hover:border-brand-primary/60 transition">
              <Code2 size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-clash-text">
              Code<span className="text-brand-primary">Clash</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1.5">
            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-white/10 text-brand-primary border border-brand-primary/30"
                    : "text-clash-muted hover:text-clash-text hover:bg-white/5"
                }`
              }
            >
              <Code2 size={14} />
              <span>Problems</span>
            </NavLink>

            <NavLink
              to="/submissions"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-white/10 text-brand-primary border border-brand-primary/30"
                    : "text-clash-muted hover:text-clash-text hover:bg-white/5"
                }`
              }
            >
              <History size={14} />
              <span>Submissions</span>
            </NavLink>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-clash-border">
                <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white">
                  <User size={14} />
                </div>
                <span className="text-sm font-semibold text-clash-text">
                  @{user.username}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-status-error/25 text-red-400 hover:bg-status-error/10 hover:border-status-error/40 transition cursor-pointer"
                title="Sign out"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium text-clash-muted bg-status-success/10 border border-status-success/20 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-status-success shadow-[0_0_8px_var(--color-status-success)]"></span>
              <span>Judge Ready</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
