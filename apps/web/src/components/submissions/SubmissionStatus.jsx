import { Clock } from "lucide-react";
import { VerdictBadge } from "./VerdictBadge.jsx";

/**
 * Compact inline badge rendering normalized pending state or completed verdict:
 * QUEUED -> "In Queue"
 * RUNNING -> "Judging"
 * COMPLETED -> VerdictBadge
 */
export function SubmissionStatusBadge({ status, verdict, asPill = false }) {
  if (status === "QUEUED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
        <Clock size={12} className="animate-pulse shrink-0" />
        <span>In Queue</span>
      </span>
    );
  }

  if (status === "RUNNING") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping shrink-0"></span>
        <span>Judging</span>
      </span>
    );
  }

  // Final verdict displayed only once judging is complete
  if (verdict) {
    return <VerdictBadge verdict={verdict} asPill={asPill} />;
  }

  return null;
}

/**
 * Renders the intermediate state of an in-flight submission (QUEUED, RUNNING).
 */
export function SubmissionStatus({ status, submissionId, totalTestCount }) {
  if (status !== "QUEUED" && status !== "RUNNING") return null;

  const isQueued = status === "QUEUED";

  return (
    <div className="rounded-xl border border-clash-border bg-clash-card p-4 space-y-3 text-xs shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 font-bold ${
            isQueued ? "text-amber-400" : "text-brand-primary"
          }`}
        >
          {isQueued ? (
            <Clock size={14} className="text-amber-400 animate-pulse" />
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-ping"></span>
          )}
          <span>{isQueued ? "In Queue" : "Judging"}</span>
        </div>
        {submissionId && (
          <span className="text-[11px] font-mono text-clash-muted">
            ID: {submissionId}
          </span>
        )}
      </div>
      <p className="text-xs leading-relaxed text-slate-300">
        {isQueued
          ? "Your solution is recorded in PostgreSQL and waiting for an available judge worker."
          : "The judge worker has claimed your solution and is executing it in isolated Judge0 containers."}
      </p>

      {isQueued && (
        <div className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-center gap-2">
          <Clock size={13} className="text-amber-400 shrink-0" />
          <span>
            If taking longer than expected, ensure the worker is running:{" "}
            <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-amber-200">
              npm run dev:worker
            </code>
          </span>
        </div>
      )}

      {typeof totalTestCount === "number" && totalTestCount > 0 && (
        <div className="text-[11px] text-clash-muted flex items-center gap-2 pt-1 border-t border-clash-border">
          <span>Evaluating {totalTestCount} hidden test cases</span>
        </div>
      )}
    </div>
  );
}
