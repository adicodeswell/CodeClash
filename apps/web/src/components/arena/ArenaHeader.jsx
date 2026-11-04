import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Code2, ArrowLeft, User, LogOut } from "lucide-react";
import { RunButton } from "../editor/RunButton.jsx";
import { SubmitButton } from "../editor/SubmitButton.jsx";
import { ProblemProgressBadge } from "../problems/ProblemProgressBadge.jsx";

export function ArenaHeader({
  problemTitle,
  isSolved = false,
  isAttempted = false,
  onRun,
  onSubmit,
  isRunning = false,
  isSubmitting = false,
}) {
  const { user, logout } = useAuth();

  return (
    <header className="h-13 border-b border-clash-border bg-clash-surface/95 backdrop-blur-md px-4 flex items-center justify-between shrink-0 select-none z-20">
      {/* Left: Brand + Problem Navigation */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group" title="CodeClash Home">
          <div className="w-7 h-7 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary group-hover:border-brand-primary/50 transition">
            <Code2 size={15} />
          </div>
          <span className="text-sm font-bold tracking-tight text-clash-text hidden sm:inline-block">
            Code<span className="text-brand-primary">Clash</span>
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
            <ProblemProgressBadge isSolved={isSolved} isAttempted={isAttempted} asPill={true} />
          </>
        )}
      </div>

      {/* Center: Run & Submit Actions */}
      <div className="flex items-center gap-2.5">
        <RunButton
          onRun={onRun}
          isRunning={isRunning}
          disabled={isSubmitting}
          size="sm"
        />
        <SubmitButton
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          disabled={isRunning}
          size="sm"
        />
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
