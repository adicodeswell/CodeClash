import { DifficultyBadge } from "./DifficultyBadge.jsx";
import { ProblemProgressBadge } from "./ProblemProgressBadge.jsx";
import { Tag } from "lucide-react";

export function ProblemMetadata({ problem }) {
  if (!problem) return null;

  const supportedLanguages = problem.languages
    ? Object.keys(problem.languages).filter((k) => problem.languages[k]?.enabled)
    : [];

  return (
    <div className="space-y-3.5 pb-4 border-b border-clash-border">
      {/* Title & Difficulty */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-clash-text tracking-tight mb-2.5">
          {problem.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={problem.difficulty} />
          <ProblemProgressBadge
            isSolved={problem.isSolved}
            isAttempted={problem.isAttempted}
            asPill={true}
          />
        </div>
      </div>

      {/* Topics & Languages */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Topics */}
        {problem.topics && problem.topics.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Tag size={12} className="text-clash-subtle" />
            {problem.topics.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-clash-border text-clash-muted text-[11px] font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Enabled Languages */}
        {supportedLanguages.length > 0 && (
          <div className="flex items-center gap-1 text-[11px] text-clash-subtle">
            <span>Languages:</span>
            <span className="font-mono text-clash-muted uppercase">
              {supportedLanguages.join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
