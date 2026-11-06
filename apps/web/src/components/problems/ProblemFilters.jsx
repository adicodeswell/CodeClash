import { RotateCcw, Filter, ChevronDown } from "lucide-react";

const DIFFICULTIES = [
  { key: "ALL", label: "All" },
  { key: "EASY", label: "Easy", activeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { key: "MEDIUM", label: "Medium", activeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { key: "HARD", label: "Hard", activeClass: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
];

const TOPICS = [
  "ALL",
  "Array",
  "Backtracking",
  "Binary Search",
  "Binary Search Tree",
  "Binary Tree",
  "Bit Manipulation",
  "Breadth-First Search",
  "Bucket Sort",
  "Counting",
  "Data Stream",
  "Depth-First Search",
  "Design",
  "Divide and Conquer",
  "Dynamic Programming",
  "Eulerian Circuit",
  "Geometry",
  "Graph",
  "Greedy",
  "Hash Table",
  "Heap",
  "Intervals",
  "Linked List",
  "Math",
  "Matrix",
  "Merge Sort",
  "Minimum Spanning Tree",
  "Monotonic Deque",
  "Monotonic Queue",
  "Monotonic Stack",
  "Prefix Sum",
  "Queue",
  "Recursion",
  "Shortest Path",
  "Simulation",
  "Sliding Window",
  "Sorting",
  "Stack",
  "String",
  "Topological Sort",
  "Tree",
  "Trie",
  "Two Pointers",
  "Union Find",
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
      <div className="flex bg-[#141417] p-1 rounded-xl border border-white/[0.08] shadow-inner">
        {DIFFICULTIES.map((item) => {
          const isActive = difficulty === item.key;
          const activeStyle = item.activeClass || "bg-white/[0.08] text-white border-white/[0.12]";

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onDifficultyChange(item.key)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                isActive
                  ? `${activeStyle} shadow-sm`
                  : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Topic Dropdown */}
      <div className="relative flex items-center">
        <Filter size={12} className="absolute left-3 text-zinc-500 pointer-events-none" />
        <select
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="pl-8 pr-8 py-1.5 bg-[#141417] border border-white/[0.08] rounded-xl text-xs font-medium text-zinc-200 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 cursor-pointer hover:border-white/20 transition appearance-none"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-[#141417] text-zinc-200">
              {t === "ALL" ? "All Topics" : t}
            </option>
          ))}
        </select>
        <ChevronDown size={12} className="absolute right-3 text-zinc-500 pointer-events-none" />
      </div>

      {/* Clear Active Filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-[#141417] border border-white/[0.08] hover:border-white/20 transition cursor-pointer"
          title="Reset search and filters"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
