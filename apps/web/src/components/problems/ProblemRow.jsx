import { Link } from "react-router-dom";
import { DifficultyBadge } from "./DifficultyBadge.jsx";
import { ProblemProgressBadge } from "./ProblemProgressBadge.jsx";
import { ChevronRight, Code2, SquareArrowOutUpRight } from "lucide-react";

const GFG_SLUG_MAP = {
  // Map any GeeksforGeeks specific problem slugs
};

function getExternalUrl(slug) {
  if (GFG_SLUG_MAP[slug]) return GFG_SLUG_MAP[slug];
  return `https://leetcode.com/problems/${slug}/`;
}

function getPlatformLabel(slug) {
  return GFG_SLUG_MAP[slug] ? "GeeksforGeeks" : "LeetCode";
}

export function ProblemRow({ problem, index }) {
  const visibleTopics = (problem.topics || []).slice(0, 3);
  const overflowTopics = (problem.topics || []).slice(3);

  return (
    <tr className="border-b border-white/[0.05] hover:bg-white/[0.025] transition-all duration-150 group">
      {/* Solved / Attempted Progress Status */}
      <td className="py-3 px-3 w-12 text-center">
        <div className="flex items-center justify-center">
          <ProblemProgressBadge
            isSolved={problem.isSolved}
            isAttempted={problem.isAttempted}
          />
        </div>
      </td>

      {/* Index */}
      <td className="py-3 px-3 text-xs font-mono text-zinc-500 w-12 text-center font-medium">
        {index + 1}
      </td>

      {/* Title & Link */}
      <td className="py-3 px-4">
        <Link
          to={`/problems/${problem.slug}`}
          className="text-[13.5px] font-medium text-zinc-200 group-hover:text-brand-primary transition-colors flex items-center gap-2.5"
        >
          <Code2
            size={14}
            className="text-zinc-500 group-hover:text-brand-primary transition-colors shrink-0"
          />
          <span className="truncate">{problem.title}</span>
          <ChevronRight
            size={13}
            className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-brand-primary shrink-0"
          />
        </Link>
      </td>

      {/* Difficulty */}
      <td className="py-3 px-4 w-32">
        <DifficultyBadge difficulty={problem.difficulty} />
      </td>

      {/* Topics */}
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1.5 items-center">
          {visibleTopics.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/15 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
          {overflowTopics.length > 0 && (
            <span
              title={overflowTopics.join(", ")}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.05] text-zinc-500 hover:text-zinc-300 hover:border-white/10 transition-colors cursor-default"
            >
              +{overflowTopics.length}
            </span>
          )}
          {(!problem.topics || problem.topics.length === 0) && (
            <span className="text-xs text-zinc-600">—</span>
          )}
        </div>
      </td>

      {/* External Practice / Original Link */}
      <td className="py-3 px-4 w-16 text-center">
        <a
          href={getExternalUrl(problem.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-7 h-7 text-zinc-500 hover:text-brand-primary transition-colors duration-200 group/link"
          title={`Practice on ${getPlatformLabel(problem.slug)}`}
          aria-label={`Open ${problem.title} on ${getPlatformLabel(problem.slug)}`}
          onClick={(e) => e.stopPropagation()}
        >
          <SquareArrowOutUpRight
            size={14}
            className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-200"
          />
        </a>
      </td>
    </tr>
  );
}
