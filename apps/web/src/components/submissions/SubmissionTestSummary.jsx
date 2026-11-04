import { CheckCircle2, XCircle, MinusCircle, Layers } from "lucide-react";

export function SubmissionTestSummary({
  passedTestCount,
  totalTestCount,
  verdict,
  status,
}) {
  if (totalTestCount == null || totalTestCount <= 0) {
    return null;
  }

  const passed = Math.max(0, passedTestCount ?? 0);
  const total = totalTestCount;
  const percent = Math.min(100, Math.round((passed / total) * 100));
  const isAccepted = verdict === "ACCEPTED";
  const isCompleted = status === "COMPLETED";

  // Build safe chip array for up to total tests (capped for display sanity)
  const chips = [];
  const displayLimit = Math.min(total, 50);

  for (let i = 1; i <= displayLimit; i++) {
    if (i <= passed) {
      chips.push({ index: i, state: "PASSED" });
    } else if (i === passed + 1 && !isAccepted && isCompleted) {
      chips.push({ index: i, state: "FAILED" });
    } else {
      chips.push({ index: i, state: "UNTESTED" });
    }
  }

  return (
    <div className="rounded-2xl border border-clash-border bg-clash-card p-5 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-brand-primary" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Benchmark Test Suite Evaluation
          </h3>
        </div>

        <div className="text-xs font-mono font-semibold text-slate-300">
          <span className={isAccepted ? "text-emerald-400 font-bold" : "text-slate-200"}>
            {passed}
          </span>
          <span className="text-clash-muted"> / {total} tests passed</span>
          <span className="text-clash-subtle ml-1.5 font-sans">({percent}%)</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isAccepted ? "bg-emerald-500" : percent > 0 ? "bg-amber-500" : "bg-red-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Safe Test Case Badges (Hidden Benchmark Suite Protection: Never shows inputs/outputs) */}
      <div className="pt-2 border-t border-clash-border/50">
        <div className="text-[11px] font-medium text-clash-muted mb-2">
          Test Case Execution Breakdown:
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            if (chip.state === "PASSED") {
              return (
                <span
                  key={chip.index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                >
                  <CheckCircle2 size={12} className="shrink-0" />
                  <span>Test {chip.index}</span>
                </span>
              );
            }

            if (chip.state === "FAILED") {
              return (
                <span
                  key={chip.index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-red-500/10 text-red-400 border border-red-500/20"
                >
                  <XCircle size={12} className="shrink-0" />
                  <span>Test {chip.index}: Failed</span>
                </span>
              );
            }

            return (
              <span
                key={chip.index}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-clash-muted bg-white/5 border border-white/5"
              >
                <MinusCircle size={12} className="text-clash-subtle shrink-0" />
                <span>Test {chip.index}</span>
              </span>
            );
          })}
          {total > displayLimit && (
            <span className="text-[11px] font-mono text-clash-muted self-center">
              + {total - displayLimit} more tests
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
