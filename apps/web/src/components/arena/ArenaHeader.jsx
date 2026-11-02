import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Swords, ArrowLeft, Play, Zap, User, LogOut } from "lucide-react";

export function ArenaHeader({ problemTitle, onRun, onSubmit, isRunning = false, isSubmitting = false }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-13 border-b border-clash-border bg-clash-surface/95 backdrop-blur-md px-4 flex items-center justify-between shrink-0 select-none z-20">
      {/* Left: Brand + Problem Navigation */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group" title="CodeClash Home">
          <div className="w-7 h-7 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary group-hover:border-brand-primary/60 transition">
            <Swords size={16} />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-clash-text hidden sm:inline-block">
            Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">Clash</span>
          </span>
        </Link>

        <span className="text-clash-subtle text-xs">/</span>

        <Link
          to="/problems"
          className="flex items-center gap-1.5 text-xs font-semibold text-clash-muted hover:text-clash-text transition px-2 py-1 rounded-md hover:bg-white/5"
          title="Back to Problem Catalog"
        >
          <ArrowLeft size={13} />
          <span>Catalog</span>
        </Link>

        {problemTitle && (
          <>
            <span className="text-clash-subtle text-xs hidden md:inline">/</span>
            <span className="text-xs font-semibold text-clash-text truncate max-w-[200px] hidden md:inline">
              {problemTitle}
            </span>
          </>
        )}
      </div>

      {/* Center: Run & Submit Actions */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onRun}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-clash-border bg-clash-card hover:bg-clash-card-hover hover:border-brand-primary/40 text-clash-text text-xs font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          title="Run code against sample test cases (Ctrl + Enter)"
        >
          {isRunning ? (
            <div className="w-3.5 h-3.5 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
          ) : (
            <Play size={13} className="text-emerald-400 fill-emerald-400/20" />
          )}
          <span>Run</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-slate-950 font-bold text-xs shadow-md shadow-brand-primary/20 hover:shadow-brand-primary/35 hover:brightness-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          title="Submit code for full judging evaluation"
        >
          {isSubmitting ? (
            <div className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
          ) : (
            <Zap size={13} className="fill-slate-950" />
          )}
          <span>Submit</span>
        </button>
      </div>

      {/* Right: User Profile Indicator */}
      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-clash-border">
              <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center text-slate-950 text-[10px] font-bold">
                <User size={12} />
              </div>
              <span className="text-xs font-semibold text-clash-text truncate max-w-[120px]">
                @{user.username}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-clash-subtle hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-clash-border text-xs font-semibold text-clash-muted hover:text-clash-text hover:border-brand-primary/30 transition"
          >
            <User size={13} />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
}
