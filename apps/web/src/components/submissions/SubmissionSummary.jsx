import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { DifficultyBadge } from "../problems/DifficultyBadge.jsx";
import { SubmissionStatusBadge } from "./SubmissionStatus.jsx";
import { SubmissionMetrics } from "./SubmissionMetrics.jsx";

export function SubmissionSummary({ submission }) {
  if (!submission) return null;

  const {
    id,
    problem,
    language,
    status,
    verdict,
    runtimeMs,
    memoryKb,
    passedTestCount,
    totalTestCount,
    createdAt,
    completedAt,
  } = submission;

  const formattedDate = new Date(createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-clash-border bg-clash-card p-5 sm:p-6 space-y-5 shadow-sm">
      {/* Top Bar: Problem Title & Verdict Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-clash-border/70">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            {problem?.slug ? (
              <Link
                to={`/problems/${problem.slug}`}
                className="text-lg sm:text-xl font-bold text-slate-100 hover:text-brand-primary flex items-center gap-1.5 transition group"
              >
                <span>{problem.title || problem.slug}</span>
                <ArrowUpRight size={16} className="text-clash-muted group-hover:text-brand-primary transition" />
              </Link>
            ) : (
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                Submission {id}
              </h2>
            )}
            {problem?.difficulty && (
              <DifficultyBadge difficulty={problem.difficulty} />
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-clash-muted font-mono">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="uppercase font-semibold text-slate-300">{language}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-clash-subtle">ID: {id}</span>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="shrink-0">
          <SubmissionStatusBadge status={status} verdict={verdict} asPill={true} />
        </div>
      </div>

      {/* Metrics Row: Runtime, Memory, Passed Tests */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-clash-muted mb-2">
          Execution Metrics
        </div>
        <SubmissionMetrics
          runtimeMs={runtimeMs}
          memoryKb={memoryKb}
          passedTestCount={passedTestCount}
          totalTestCount={totalTestCount}
          compact={false}
        />
      </div>
    </div>
  );
}
