import { CheckCircle2, CircleDot } from "lucide-react";

/**
 * Reusable progress indicator:
 * - Solved: Emerald checkmark indicator for problems with at least 1 ACCEPTED submission.
 * - Attempted: Amber indicator for problems with submissions but no accepted verdict.
 * - Untouched: Neutral subtle placeholder or null.
 */
export function ProblemProgressBadge({
  isSolved,
  isAttempted,
  showLabel = false,
  asPill = false,
}) {
  if (isSolved) {
    if (asPill) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 size={12} className="shrink-0" />
          <span>Solved</span>
        </span>
      );
    }

    return (
      <span
        className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-xs"
        title="Solved"
      >
        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
        {showLabel && <span>Solved</span>}
      </span>
    );
  }

  if (isAttempted) {
    if (asPill) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <CircleDot size={12} className="shrink-0" />
          <span>Attempted</span>
        </span>
      );
    }

    return (
      <span
        className="inline-flex items-center gap-1.5 text-amber-400 font-semibold text-xs"
        title="Attempted"
      >
        <CircleDot size={15} className="text-amber-400 shrink-0" />
        {showLabel && <span>Attempted</span>}
      </span>
    );
  }

  // Untouched problem
  if (asPill || showLabel) {
    return null;
  }

  return (
    <span
      className="inline-flex items-center justify-center text-clash-subtle text-xs select-none w-4 h-4 opacity-40"
      title="Not attempted"
    >
      —
    </span>
  );
}
