import { Zap } from "lucide-react";

export function SubmitButton({ onSubmit, isSubmitting = false, disabled = false, size = "sm" }) {
  const isActionDisabled = isSubmitting || disabled;

  const sizeClasses =
    size === "sm"
      ? "px-3.5 py-1.5 text-xs gap-1.5"
      : "px-5 py-2 text-sm gap-2";

  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={isActionDisabled}
      className={`flex items-center rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-slate-950 font-bold shadow-md shadow-brand-primary/20 hover:shadow-brand-primary/35 hover:brightness-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sizeClasses}`}
      title="Submit solution for full judging evaluation"
      aria-label="Submit Code"
    >
      {isSubmitting ? (
        <div className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
      ) : (
        <Zap size={13} className="fill-slate-950" />
      )}
      <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
    </button>
  );
}
