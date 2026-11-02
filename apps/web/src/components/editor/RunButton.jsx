import { Play } from "lucide-react";

export function RunButton({ onRun, isRunning = false, disabled = false, size = "sm" }) {
  const isActionDisabled = isRunning || disabled;

  const sizeClasses =
    size === "sm"
      ? "px-3 py-1.5 text-xs gap-1.5"
      : "px-4 py-2 text-sm gap-2";

  return (
    <button
      type="button"
      onClick={onRun}
      disabled={isActionDisabled}
      className={`flex items-center rounded-lg border border-clash-border bg-clash-card hover:bg-clash-card-hover hover:border-brand-primary/40 text-clash-text font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sizeClasses}`}
      title="Run solution against sample test cases (Ctrl + Enter)"
      aria-label="Run Code"
    >
      {isRunning ? (
        <div className="w-3.5 h-3.5 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
      ) : (
        <Play size={13} className="text-emerald-400 fill-emerald-400/20" />
      )}
      <span>{isRunning ? "Running..." : "Run"}</span>
    </button>
  );
}
