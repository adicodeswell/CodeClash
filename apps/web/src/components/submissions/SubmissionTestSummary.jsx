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

  return (
    <div className="rounded-xl border border-clash-border bg-clash-card p-5 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Test Cases Passed
        </h3>

        <div className="text-xs font-mono font-semibold text-slate-300">
          <span className={isAccepted ? "text-emerald-400 font-bold" : "text-slate-100 font-bold"}>
            {passed}
          </span>
          <span className="text-clash-muted"> / {total} passed</span>
          <span className="text-clash-subtle ml-1.5 font-sans">({percent}%)</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isAccepted ? "bg-emerald-500" : percent > 0 ? "bg-amber-500" : "bg-red-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {!isAccepted && isCompleted && (
        <div className="text-[11px] font-mono text-clash-muted pt-1">
          Halted on test <span className="text-red-400 font-semibold">{passed + 1}</span> of {total}
        </div>
      )}
    </div>
  );
}
