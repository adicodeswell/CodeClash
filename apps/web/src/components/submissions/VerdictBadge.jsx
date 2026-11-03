import { getVerdictConfig } from "./verdictConfig.js";

export function VerdictBadge({ verdict }) {
  const config = getVerdictConfig(verdict);
  return (
    <span className="flex items-center gap-1.5">
      {config.icon}
      <span
        className={
          verdict === "ACCEPTED"
            ? "text-emerald-400 font-bold"
            : "text-red-400 font-bold"
        }
      >
        {config.title}
      </span>
    </span>
  );
}
