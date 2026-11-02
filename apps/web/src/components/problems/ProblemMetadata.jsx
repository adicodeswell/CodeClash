import { DifficultyBadge } from "./DifficultyBadge.jsx";
import { Clock, HardDrive, Tag } from "lucide-react";

export function ProblemMetadata({ problem }) {
  if (!problem) return null;

  const memoryMb = problem.memoryLimitKb
    ? Math.round(problem.memoryLimitKb / 1024)
    : 256;

  const supportedLanguages = problem.languages
    ? Object.keys(problem.languages).filter((k) => problem.languages[k]?.enabled)
    : [];

  return (
    <div className="space-y-4 pb-4 border-b border-clash-border">
      {/* Title & Difficulty */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-clash-text tracking-tight mb-2">
          {problem.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={problem.difficulty} />
          
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-clash-muted bg-white/5 border border-clash-border">
            <Clock size={12} className="text-emerald-400" />
            <span>{problem.timeLimitMs || 2000} ms</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-clash-muted bg-white/5 border border-clash-border">
            <HardDrive size={12} className="text-teal-400" />
            <span>{memoryMb} MB</span>
          </div>
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
                className="px-2 py-0.5 rounded-md bg-clash-surface border border-clash-border text-clash-muted font-medium"
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
