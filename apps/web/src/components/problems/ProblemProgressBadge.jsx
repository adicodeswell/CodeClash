import { CheckCircle2, CircleDot } from "lucide-react";

/**
 * Modern problem solve status indicator:
 * - Solved: Emerald checkmark with subtle glowing aura.
 * - Attempted: Amber circle with subtle amber aura.
 * - Untouched: Minimal subtle dot.
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
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
          <CheckCircle2 size={12} className="shrink-0" />
          <span>Solved</span>
        </span>
      );
    }

    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-[0_0_8px_rgba(16,185,129,0.2)] transition-transform duration-150 hover:scale-110"
        title="Solved"
      >
        <CheckCircle2 size={13} className="shrink-0" />
        {showLabel && <span className="ml-1 text-xs font-semibold">Solved</span>}
      </span>
    );
  }

  if (isAttempted) {
    if (asPill) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-[0_0_8px_rgba(245,158,11,0.15)]">
          <CircleDot size={12} className="shrink-0" />
          <span>Attempted</span>
        </span>
      );
    }

    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-[0_0_8px_rgba(245,158,11,0.2)] transition-transform duration-150 hover:scale-110"
        title="Attempted"
      >
        <CircleDot size={13} className="shrink-0" />
        {showLabel && <span className="ml-1 text-xs font-semibold">Attempted</span>}
      </span>
    );
  }

  // Untouched problem
  if (asPill || showLabel) {
    return null;
  }

  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 text-zinc-600 hover:text-zinc-400 transition-colors"
      title="Not attempted"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700/60 transition-transform group-hover:scale-125" />
    </span>
  );
}
