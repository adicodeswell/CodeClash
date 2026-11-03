import { useState } from "react";
import {
  Zap,
  Cpu,
  Terminal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { getVerdictConfig } from "./verdictConfig.js";

/**
 * Renders the terminal outcome of a submission including verdict, metrics, and safe diagnostics.
 */
export function SubmissionResult({ submission }) {
  const [showErrorSummary, setShowErrorSummary] = useState(true);

  if (!submission || submission.status !== "COMPLETED") return null;

  const badge = getVerdictConfig(submission.verdict);

  return (
    <div className="space-y-4">
      {/* Verdict Header Card */}
      <div
        className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${badge.className}`}
      >
        <div className="flex items-center gap-2.5">
          {badge.icon}
          <span className="text-base font-bold tracking-wide">
            {badge.title}
          </span>
        </div>
        {typeof submission.passedTestCount === "number" && (
          <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-black/30 border border-white/10 w-fit">
            {submission.passedTestCount} / {submission.totalTestCount} test cases passed
          </div>
        )}
      </div>

      {/* Benchmark Metrics (Runtime & Memory) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-clash-border bg-clash-surface/60 p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Zap size={16} />
          </div>
          <div>
            <div className="text-[11px] font-medium text-clash-muted">Runtime</div>
            <div className="text-sm font-bold text-clash-text font-mono">
              {submission.runtimeMs != null ? `${submission.runtimeMs} ms` : "—"}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-clash-border bg-clash-surface/60 p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Cpu size={16} />
          </div>
          <div>
            <div className="text-[11px] font-medium text-clash-muted">Memory</div>
            <div className="text-sm font-bold text-clash-text font-mono">
              {submission.memoryKb != null
                ? `${(submission.memoryKb / 1024).toFixed(1)} MB`
                : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Error Diagnostics / Traceback (Safe compiler or runtime outputs) */}
      {submission.errorSummary && (
        <div className="rounded-xl border border-red-500/25 bg-red-500/10 overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setShowErrorSummary(!showErrorSummary)}
            className="w-full px-3.5 py-2.5 bg-red-500/15 border-b border-red-500/20 flex items-center justify-between font-semibold text-red-300 text-left cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Terminal size={13} />
              Execution Diagnostics
            </span>
            {showErrorSummary ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showErrorSummary && (
            <pre className="p-3.5 font-mono text-red-200 text-[11px] whitespace-pre-wrap overflow-x-auto max-h-48 leading-relaxed">
              {submission.errorSummary}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
