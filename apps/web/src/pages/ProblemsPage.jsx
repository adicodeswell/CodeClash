import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProblems } from "../services/problems.api.js";
import { ProblemSearch } from "../components/problems/ProblemSearch.jsx";
import { ProblemFilters } from "../components/problems/ProblemFilters.jsx";
import { ProblemList } from "../components/problems/ProblemList.jsx";
import { Pagination } from "../components/problems/Pagination.jsx";
import { Code2 } from "lucide-react";

export function ProblemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse state from URL search params
  const search = searchParams.get("search") || "";
  const difficulty = searchParams.get("difficulty") || "ALL";
  const topic = searchParams.get("topic") || "ALL";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const [problems, setProblems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetchProblems({
      search,
      difficulty,
      topic,
      page,
      limit: 20,
    })
      .then((data) => {
        if (isMounted) {
          setProblems(data.problems);
          setPagination(data.pagination);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "An unexpected error occurred while loading problems.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [search, difficulty, topic, page, retryKey]);

  // Updating filters resets page to 1
  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "ALL") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.set("page", "1");
    setSearchParams(next);
  };

  const handlePageChange = (newPage) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(newPage));
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handleRetry = () => {
    setLoading(true);
    setRetryKey((k) => k + 1);
  };

  const hasActiveFilters = Boolean(
    search || (difficulty && difficulty !== "ALL") || (topic && topic !== "ALL")
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full text-left">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Code2 className="text-brand-primary" size={28} />
              <span>Problem Catalog</span>
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Curated challenges across 43 topic patterns with verified test benchmarks and multilingual execution support.
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => updateFilter("difficulty", difficulty === "EASY" ? "ALL" : "EASY")}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                difficulty === "EASY"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(52,211,153,0.2)]"
                  : "bg-[#141417] text-emerald-400/90 border-white/[0.08] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
              }`}
            >
              52 Easy
            </button>

            <button
              type="button"
              onClick={() => updateFilter("difficulty", difficulty === "MEDIUM" ? "ALL" : "MEDIUM")}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                difficulty === "MEDIUM"
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_10px_rgba(251,191,36,0.2)]"
                  : "bg-[#141417] text-amber-400/90 border-white/[0.08] hover:border-amber-500/30 hover:bg-amber-500/[0.05]"
              }`}
            >
              167 Med
            </button>

            <button
              type="button"
              onClick={() => updateFilter("difficulty", difficulty === "HARD" ? "ALL" : "HARD")}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                difficulty === "HARD"
                  ? "bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-[0_0_10px_rgba(251,113,133,0.2)]"
                  : "bg-[#141417] text-rose-400/90 border-white/[0.08] hover:border-rose-500/30 hover:bg-rose-500/[0.05]"
              }`}
            >
              27 Hard
            </button>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 mb-5">
        <ProblemSearch
          value={search}
          onChange={(val) => updateFilter("search", val)}
        />
        <ProblemFilters
          difficulty={difficulty}
          topic={topic}
          hasActiveFilters={hasActiveFilters}
          onDifficultyChange={(val) => updateFilter("difficulty", val)}
          onTopicChange={(val) => updateFilter("topic", val)}
          onClear={handleClearFilters}
        />
      </div>

      {/* Catalog List */}
      <ProblemList
        problems={problems}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        onClearFilters={handleClearFilters}
      />

      {/* Pagination Controls */}
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
