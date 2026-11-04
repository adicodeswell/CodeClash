import { Link } from "react-router-dom";
import { SubmissionStatusBadge } from "./SubmissionStatus.jsx";
import { DifficultyBadge } from "../problems/DifficultyBadge.jsx";
import { ArrowUpRight } from "lucide-react";
import { formatRuntime, formatMemory } from "./SubmissionMetrics.jsx";

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
        <Link
          to={`/submissions/${id}`}
          className="flex flex-col gap-1 group/link hover:opacity-90 w-fit"
          title="Inspect submission code and details"
        >
          <SubmissionStatusBadge status={status} verdict={verdict} />
          {status === "COMPLETED" && totalTestCount != null && totalTestCount > 0 && (
            <span className="text-[11px] font-mono text-clash-muted group-hover/link:text-brand-primary transition">
              {passedTestCount ?? 0}/{totalTestCount} passed
            </span>
          )}
        </Link>
      </td>

      {/* Language */}
      <td className="py-4 px-4 text-xs font-mono text-slate-300">
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase">
          {language}
        </span>
      </td>

      {/* Runtime */}
      <td className="py-4 px-4 text-xs text-slate-300">
        {formatRuntime(runtimeMs) ? (
          <span className="font-mono">{formatRuntime(runtimeMs)}</span>
        ) : (
          <span className="text-clash-muted">—</span>
        )}
      </td>

      {/* Memory */}
      <td className="py-4 px-4 text-xs text-slate-300 hidden md:table-cell">
        {formatMemory(memoryKb) ? (
          <span className="font-mono">{formatMemory(memoryKb)}</span>
        ) : (
          <span className="text-clash-muted">—</span>
        )}
      </td>

      {/* Timestamp & Detail Link */}
      <td className="py-4 px-4 sm:px-6 text-xs text-right font-mono">
        <div className="flex items-center justify-end gap-3">
          <span className="text-clash-muted">{formattedDate}</span>
          <Link
            to={`/submissions/${id}`}
            className="text-[11px] font-sans font-semibold text-brand-primary hover:text-white opacity-0 group-hover:opacity-100 transition px-2.5 py-1 rounded-md bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30"
          >
            Details
          </Link>
        </div>
      </td>
    </tr>
  );
}
