import { Link } from "react-router-dom";
import { DifficultyBadge } from "./DifficultyBadge.jsx";
import { ProblemProgressBadge } from "./ProblemProgressBadge.jsx";
import { ChevronRight, Code2 } from "lucide-react";

export function ProblemRow({ problem, index }) {
  return (
    <tr className="border-b border-clash-border/60 hover:bg-clash-card-hover/40 transition-colors group">
      {/* Solved / Attempted Progress Status */}
      <td className="py-3.5 px-3 w-12 text-center">
        <div className="flex items-center justify-center">
          <ProblemProgressBadge
            isSolved={problem.isSolved}
            isAttempted={problem.isAttempted}
          />
        </div>
      </td>

      {/* Index */}
      <td className="py-3.5 px-3 text-xs font-mono text-clash-subtle w-10 text-center">
        {index + 1}
      </td>

      {/* Title & Link */}
      <td className="py-3.5 px-4">
        <Link
          to={`/problems/${problem.slug}`}
          className="text-sm font-semibold text-clash-text group-hover:text-brand-primary transition-colors flex items-center gap-2"
        >
          <Code2 size={15} className="text-clash-subtle group-hover:text-brand-primary transition-colors shrink-0" />
          <span>{problem.title}</span>
          <ChevronRight
            size={14}
            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-primary shrink-0"
          />
        </Link>
      </td>

      {/* Difficulty */}
      <td className="py-3.5 px-4 w-32">
        <DifficultyBadge difficulty={problem.difficulty} />
      </td>

      {/* Topics */}
      <td className="py-3.5 px-4">
        <div className="flex flex-wrap gap-1.5 items-center">
          {problem.topics && problem.topics.length > 0 ? (
            problem.topics.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-clash-border text-clash-muted hover:border-clash-border-light transition-colors"
              >
                {t}
              </span>
            ))
          ) : (
            <span className="text-xs text-clash-subtle">—</span>
          )}
        </div>
      </td>
    </tr>
  );
}
