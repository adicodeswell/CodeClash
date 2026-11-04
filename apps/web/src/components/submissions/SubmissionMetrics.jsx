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
          <span className="text-slate-200">
            {testsDisplay}
          </span>
        )}
        <span className={runtimeDisplay ? "text-slate-200" : "text-clash-muted"}>
          {runtimeDisplay || "—"}
        </span>
        <span className={`hidden sm:inline ${memoryDisplay ? "text-slate-200" : "text-clash-muted"}`}>
          {memoryDisplay || "—"}
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
      {testsDisplay && (
        <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
          <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider">
            Test Cases Passed
          </span>
          <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
            {testsDisplay}
          </span>
        </div>
      )}

      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
        <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider">
          Runtime
        </span>
        <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
          {runtimeDisplay || "—"}
        </span>
      </div>

      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
        <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider">
          Memory
        </span>
        <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
          {memoryDisplay || "—"}
        </span>
      </div>
    </div>
  );
}
