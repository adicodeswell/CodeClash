import { ProblemRow } from "./ProblemRow.jsx";
import { AlertCircle, Inbox } from "lucide-react";

export function ProblemList({ problems, loading, error, onRetry, onClearFilters }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-clash-border bg-clash-card p-12 text-center my-4">
        <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs sm:text-sm text-clash-muted">Loading problems from catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-status-error/10 border border-status-error/25 p-8 text-center my-4">
        <AlertCircle size={32} className="mx-auto text-status-error mb-2" />
        <h3 className="text-base font-bold text-red-200 mb-1">Failed to load problems</h3>
        <p className="text-xs sm:text-sm text-clash-muted mb-4 max-w-md mx-auto">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-2 bg-status-error/20 hover:bg-status-error/30 text-red-300 font-semibold text-xs rounded-xl border border-status-error/30 transition cursor-pointer"
          >
            Retry Connection
          </button>
        )}
      </div>
    );
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="rounded-2xl bg-clash-card border border-clash-border p-12 text-center my-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-clash-border flex items-center justify-center text-clash-subtle mx-auto mb-3">
          <Inbox size={24} />
        </div>
        <h3 className="text-base font-bold text-clash-text mb-1">No problems found</h3>
        <p className="text-xs sm:text-sm text-clash-muted max-w-sm mx-auto mb-4">
          No published problems match your current search and filters.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="px-4 py-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/30 font-semibold text-xs rounded-xl transition cursor-pointer"
          >
            Clear Search & Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-clash-border bg-clash-card overflow-hidden shadow-xl shadow-black/30">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-clash-border text-xs font-bold text-clash-muted uppercase tracking-wider bg-clash-surface/60">
              <th className="py-3 px-3 w-12 text-center" title="Problem status">Status</th>
              <th className="py-3 px-3 w-10 text-center">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 w-32">Difficulty</th>
              <th className="py-3 px-4">Topics</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, idx) => (
              <ProblemRow key={problem.slug} problem={problem} index={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
