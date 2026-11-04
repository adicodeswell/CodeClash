import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Swords, User, LogOut, Code2, History } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-clash-border bg-clash-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand & Nav */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary shadow-lg shadow-brand-primary/15 group-hover:border-brand-primary/60 transition">
              <Swords size={20} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-clash-text">
              Code
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                Clash
              </span>
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-clash-border text-clash-muted hidden sm:inline-block">
              v1.0
            </span>
          </Link>

          <nav className="flex items-center gap-1">
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
