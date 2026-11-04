import { Zap, HardDrive, CheckCircle2 } from "lucide-react";

/**
 * Normalizes runtime formatting. Returns null if metric is unavailable or misleading (<= 0).
 */
export function formatRuntime(runtimeMs) {
  if (runtimeMs == null || isNaN(runtimeMs) || Number(runtimeMs) <= 0) {
    return null;
  }
  return `${Math.round(Number(runtimeMs))} ms`;
}

/**
 * Normalizes memory formatting to KB or MB. Returns null if unavailable or misleading (<= 0).
 */
export function formatMemory(memoryKb) {
  if (memoryKb == null || isNaN(memoryKb) || Number(memoryKb) <= 0) {
    return null;
  }
  const kb = Number(memoryKb);
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

/**
 * Normalizes test case count formatting (e.g. "3 / 3"). Returns null if total count is invalid.
 */
export function formatTestCases(passedTestCount, totalTestCount) {
  if (totalTestCount == null || isNaN(totalTestCount) || Number(totalTestCount) <= 0) {
    return null;
  }
  return `${passedTestCount ?? 0} / ${totalTestCount}`;
}

/**
 * Unified metrics component for submissions, handling unavailable metrics
 * gracefully without displaying misleading zero values.
 */
export function SubmissionMetrics({
  runtimeMs,
  memoryKb,
  passedTestCount,
  totalTestCount,
  compact = false,
}) {
  const runtimeDisplay = formatRuntime(runtimeMs);
  const memoryDisplay = formatMemory(memoryKb);
  const testsDisplay = formatTestCases(passedTestCount, totalTestCount);

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
        {testsDisplay && (
          <span className="flex items-center gap-1 text-slate-200">
            <CheckCircle2 size={13} className="text-brand-primary shrink-0" />
            <span>{testsDisplay}</span>
          </span>
        )}
        <span className="flex items-center gap-1 text-slate-200">
          <Zap size={13} className="text-amber-400 shrink-0" />
          <span className={runtimeDisplay ? "" : "text-clash-muted"}>
            {runtimeDisplay || "—"}
          </span>
        </span>
        <span className="hidden sm:flex items-center gap-1 text-slate-200">
          <HardDrive size={13} className="text-teal-400 shrink-0" />
          <span className={memoryDisplay ? "" : "text-clash-muted"}>
            {memoryDisplay || "—"}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
      {testsDisplay && (
        <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
          <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider">
            Test Cases
          </span>
          <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
            {testsDisplay}
          </span>
        </div>
      )}

      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
        <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider flex items-center gap-1">
          <Zap size={11} className="text-amber-400" />
          <span>Runtime</span>
        </span>
        <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
          {runtimeDisplay || "—"}
        </span>
      </div>

      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
        <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider flex items-center gap-1">
          <HardDrive size={11} className="text-teal-400" />
          <span>Memory</span>
        </span>
        <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
          {memoryDisplay || "—"}
        </span>
      </div>
    </div>
  );
}
