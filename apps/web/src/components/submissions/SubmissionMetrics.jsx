import { Zap, HardDrive, CheckCircle2 } from "lucide-react";

export function SubmissionMetrics({ runtimeMs, memoryKb, passedTestCount, totalTestCount, compact = false }) {
  const hasRuntime = runtimeMs != null && !isNaN(runtimeMs);
  const hasMemory = memoryKb != null && !isNaN(memoryKb);
  const hasTests = totalTestCount != null && totalTestCount > 0;

  const memoryDisplay = hasMemory
    ? memoryKb >= 1024
      ? `${(memoryKb / 1024).toFixed(1)} MB`
      : `${memoryKb} KB`
    : "—";

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
        {hasTests && (
          <span className="flex items-center gap-1 text-slate-200">
            <CheckCircle2 size={13} className="text-brand-primary shrink-0" />
            <span>{passedTestCount ?? 0}/{totalTestCount}</span>
          </span>
        )}
        {hasRuntime ? (
          <span className="flex items-center gap-1 text-slate-200">
            <Zap size={13} className="text-amber-400 shrink-0" />
            <span>{runtimeMs} ms</span>
          </span>
        ) : (
          <span className="text-clash-muted">—</span>
        )}
        {hasMemory && (
          <span className="hidden sm:flex items-center gap-1 text-slate-200">
            <HardDrive size={13} className="text-teal-400 shrink-0" />
            <span>{memoryDisplay}</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
      {hasTests && (
        <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
          <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider">Test Cases</span>
          <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
            {passedTestCount ?? 0} / {totalTestCount}
          </span>
        </div>
      )}

      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
        <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider flex items-center gap-1">
          <Zap size={11} className="text-amber-400" />
          <span>Runtime</span>
        </span>
        <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
          {hasRuntime ? `${runtimeMs} ms` : "—"}
        </span>
      </div>

      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex flex-col justify-center">
        <span className="text-clash-muted text-[10px] font-medium uppercase tracking-wider flex items-center gap-1">
          <HardDrive size={11} className="text-teal-400" />
          <span>Memory</span>
        </span>
        <span className="font-bold text-slate-100 font-mono text-xs mt-0.5">
          {memoryDisplay}
        </span>
      </div>
    </div>
  );
}
