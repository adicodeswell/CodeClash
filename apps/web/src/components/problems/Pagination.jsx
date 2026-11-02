import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page = 1, totalPages = 1, total = 0, limit = 20, onPageChange }) {
  if (total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1 text-xs text-clash-muted">
      <div>
        Showing <span className="font-semibold text-clash-text">{start}</span>–
        <span className="font-semibold text-clash-text">{end}</span> of{" "}
        <span className="font-semibold text-clash-text">{total}</span> problems
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-clash-border bg-clash-card text-clash-text text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-clash-border-light hover:bg-clash-surface transition cursor-pointer"
        >
          <ChevronLeft size={14} />
          <span>Previous</span>
        </button>

        <span className="px-2 text-xs font-medium text-clash-muted">
          Page <span className="font-bold text-clash-text">{page}</span> / {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-clash-border bg-clash-card text-clash-text text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-clash-border-light hover:bg-clash-surface transition cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
