import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProblems } from "../services/problems.api.js";
import { ProblemSearch } from "../components/problems/ProblemSearch.jsx";
import { ProblemFilters } from "../components/problems/ProblemFilters.jsx";
import { ProblemList } from "../components/problems/ProblemList.jsx";
import { Pagination } from "../components/problems/Pagination.jsx";

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
      {/* Controls Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 mb-6">
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
