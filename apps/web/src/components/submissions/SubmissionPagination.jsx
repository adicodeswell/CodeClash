import { Loader2 } from "lucide-react";

export function SubmissionPagination({ hasNext, loadingMore, onLoadMore, currentCount }) {
  if (!hasNext) {
    if (currentCount > 0) {
      return (
        <div className="py-6 text-center text-xs text-clash-muted select-none">
          Showing all {currentCount} submission{currentCount === 1 ? "" : "s"}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="py-6 flex justify-center">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={loadingMore}
        className="px-6 py-2.5 rounded-xl border border-clash-border bg-clash-surface hover:bg-white/5 hover:border-brand-primary/40 text-xs font-bold text-slate-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {loadingMore && <Loader2 size={14} className="animate-spin text-brand-primary" />}
        <span>{loadingMore ? "Loading more..." : "Load More Submissions"}</span>
      </button>
    </div>
  );
}
