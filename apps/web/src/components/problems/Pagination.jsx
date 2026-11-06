import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);
  return pages;
}

export function Pagination({ page = 1, totalPages = 1, total = 0, limit = 20, onPageChange }) {
  if (total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 px-2 text-xs text-zinc-400 select-none">
      {/* Range summary */}
      <div className="text-zinc-400 text-xs">
        Showing <span className="font-semibold text-zinc-200">{start}</span>–
        <span className="font-semibold text-zinc-200">{end}</span> of{" "}
        <span className="font-semibold text-zinc-200">{total}</span> problems
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center justify-center p-1.5 rounded-lg border border-white/[0.08] bg-[#141417] text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/20 hover:text-white transition cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Numbered buttons */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, idx) => {
            if (p === "...") {
              return (
                <span key={`ellipsis-${idx}`} className="px-1.5 py-1 text-zinc-600 text-xs select-none">
                  …
                </span>
              );
            }

            const isActive = p === page;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-7 h-7 px-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-center ${
                  isActive
                    ? "bg-brand-primary/15 text-brand-primary border border-brand-primary/30 font-bold shadow-[0_0_10px_rgba(255,161,22,0.15)]"
                    : "border border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center justify-center p-1.5 rounded-lg border border-white/[0.08] bg-[#141417] text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/20 hover:text-white transition cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
