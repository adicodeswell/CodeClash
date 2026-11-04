import { getVerdictConfig } from "./verdictConfig.js";

/**
 * Reusable component for verdict display.
 * Maps database enum values to readable labels and distinct color schemes.
 */
export function VerdictBadge({ verdict, asPill = false }) {
  if (!verdict) return null;
  const config = getVerdictConfig(verdict);

  if (asPill) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.className}`}>
        {config.icon}
        <span>{config.title}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      {config.icon}
      <span className={`font-bold ${config.textClass || "text-slate-200"}`}>
        {config.title}
      </span>
    </span>
  );
}
