import { RotateCcw, Filter } from "lucide-react";

const DIFFICULTIES = [
  { key: "ALL", label: "All Difficulties" },
  { key: "EASY", label: "Easy" },
  { key: "MEDIUM", label: "Medium" },
  { key: "HARD", label: "Hard" },
];

const TOPICS = [
  "ALL",
  "Array",
  "Hash Table",
];

export function ProblemFilters({
  difficulty = "ALL",
  topic = "ALL",
  hasActiveFilters = false,
  onDifficultyChange,
  onTopicChange,
  onClear,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Difficulty Switcher */}
      <div className="flex bg-clash-card p-1 rounded-lg border border-clash-border">
        {DIFFICULTIES.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onDifficultyChange(item.key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
              difficulty === item.key
                ? "bg-white/10 text-slate-100 shadow-sm"
                : "text-clash-muted hover:text-clash-text"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Topic Dropdown */}
      <div className="relative flex items-center">
        <Filter size={13} className="absolute left-3 text-clash-subtle pointer-events-none" />
        <select
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="pl-8 pr-4 py-1.5 bg-clash-card border border-clash-border rounded-lg text-xs font-medium text-clash-text focus:outline-none focus:border-brand-primary cursor-pointer hover:border-clash-border-light transition"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-clash-card text-clash-text">
              {t === "ALL" ? "All Topics" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Active Filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-clash-muted hover:text-clash-text border border-clash-border hover:border-clash-border-light transition cursor-pointer"
          title="Reset search and filters"
        >
          <RotateCcw size={12} />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
