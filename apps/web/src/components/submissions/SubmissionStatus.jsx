import { Clock } from "lucide-react";

/**
 * Renders the intermediate state of an in-flight submission (QUEUED, RUNNING).
 */
export function SubmissionStatus({ status, submissionId, totalTestCount }) {
  if (status !== "QUEUED" && status !== "RUNNING") return null;

  const isQueued = status === "QUEUED";

  return (
    <div
      className={`rounded-xl border p-4 space-y-3 text-xs ${
        isQueued
          ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
          : "border-brand-primary/30 bg-brand-primary/10 text-slate-300"
      }`}
    >
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
          <span>{isQueued ? "Submission Queued" : "Judging in Progress"}</span>
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
        <div className="text-[11px] text-clash-muted flex items-center gap-2 pt-1 border-t border-brand-primary/20">
          <span>Evaluating {totalTestCount} hidden test cases</span>
        </div>
      )}
    </div>
  );
}
