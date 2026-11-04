import { Link } from "react-router-dom";
import { SubmissionStatusBadge } from "./SubmissionStatus.jsx";
import { DifficultyBadge } from "../problems/DifficultyBadge.jsx";
import { Zap, HardDrive, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function SubmissionRow({ submission }) {
  const {
    id,
    problem,
    language,
    status,
    verdict,
    passedTestCount,
    totalTestCount,
    runtimeMs,
    memoryKb,
    createdAt,
  } = submission;

  const formattedDate = new Date(createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const memoryDisplay = memoryKb != null
    ? memoryKb >= 1024
      ? `${(memoryKb / 1024).toFixed(1)} MB`
      : `${memoryKb} KB`
    : "—";

  return (
    <tr className="border-b border-clash-border/50 hover:bg-white/[0.02] transition-colors group">
      {/* Problem Title & Difficulty */}
      <td className="py-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Link
            to={`/problems/${problem.slug}`}
            className="font-bold text-sm text-slate-100 hover:text-brand-primary flex items-center gap-1.5 transition group-hover:translate-x-0.5 duration-150"
          >
            <span>{problem.title}</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
          </Link>
          <div className="shrink-0">
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>
        </div>
      </td>

      {/* Verdict / Status */}
      <td className="py-4 px-4 text-xs">
        <div className="flex flex-col gap-1">
          <SubmissionStatusBadge status={status} verdict={verdict} />
          {status === "COMPLETED" && totalTestCount != null && totalTestCount > 0 && (
            <span className="text-[11px] font-mono text-clash-muted flex items-center gap-1">
              <CheckCircle2 size={11} className="text-clash-subtle" />
              <span>{passedTestCount ?? 0}/{totalTestCount} passed</span>
            </span>
          )}
        </div>
      </td>

      {/* Language */}
      <td className="py-4 px-4 text-xs font-mono text-slate-300">
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase">
          {language}
        </span>
      </td>

      {/* Runtime */}
      <td className="py-4 px-4 text-xs text-slate-300">
        {runtimeMs != null ? (
          <span className="inline-flex items-center gap-1 font-mono">
            <Zap size={13} className="text-amber-400 shrink-0" />
            <span>{runtimeMs} ms</span>
          </span>
        ) : (
          <span className="text-clash-muted">—</span>
        )}
      </td>

      {/* Memory */}
      <td className="py-4 px-4 text-xs text-slate-300 hidden md:table-cell">
        {memoryKb != null ? (
          <span className="inline-flex items-center gap-1 font-mono">
            <HardDrive size={13} className="text-teal-400 shrink-0" />
            <span>{memoryDisplay}</span>
          </span>
        ) : (
          <span className="text-clash-muted">—</span>
        )}
      </td>

      {/* Timestamp */}
      <td className="py-4 px-4 sm:px-6 text-xs text-clash-muted text-right font-mono">
        {formattedDate}
      </td>
    </tr>
  );
}
