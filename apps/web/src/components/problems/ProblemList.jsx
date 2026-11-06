import { ProblemRow } from "./ProblemRow.jsx";
import { AlertCircle, Inbox, Terminal, ExternalLink, CircleDot, Layers, Hash } from "lucide-react";

function SkeletonRow({ index }) {
  return (
    <tr className="border-b border-white/[0.04] animate-pulse">
      <td className="py-3 px-3 text-center">
        <div className="w-5 h-5 rounded-full bg-white/5 mx-auto" />
      </td>
      <td className="py-3 px-3 text-center">
        <div className="w-5 h-3 rounded bg-white/5 mx-auto" />
      </td>
      <td className="py-3 px-4">
        <div
          className="h-4 rounded bg-white/5"
          style={{ width: `${45 + ((index * 13) % 40)}%` }}
        />
      </td>
      <td className="py-3 px-4">
        <div className="w-12 h-3.5 rounded bg-white/5" />
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-1.5">
          <div className="w-14 h-5 rounded-md bg-white/5" />
          <div className="w-18 h-5 rounded-md bg-white/5" />
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <div className="w-4 h-4 rounded bg-white/5 mx-auto" />
      </td>
    </tr>
  );
}

export function ProblemList({ problems, loading, error, onRetry, onClearFilters }) {
  if (loading) {
    return (
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#121215]/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent pointer-events-none" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-[#16161a]/90">
                <th className="py-3 px-3 w-12 text-center">Status</th>
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4 w-32">Difficulty</th>
                <th className="py-3 px-4">Topics</th>
                <th className="py-3 px-4 w-16 text-center">Link</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, idx) => (
                <SkeletonRow key={idx} index={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-status-error/10 border border-status-error/25 p-10 text-center my-4 backdrop-blur-sm">
        <AlertCircle size={32} className="mx-auto text-status-error mb-3" />
        <h3 className="text-base font-bold text-red-200 mb-1">Failed to load problems</h3>
        <p className="text-xs sm:text-sm text-zinc-400 mb-4 max-w-md mx-auto">{error}</p>
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
      <div className="rounded-2xl bg-[#121215]/80 border border-white/[0.08] p-12 text-center my-4 backdrop-blur-sm shadow-xl shadow-black/40">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-500 mx-auto mb-3 shadow-inner">
          <Inbox size={22} />
        </div>
        <h3 className="text-sm font-semibold text-zinc-200 mb-1">No matching problems</h3>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5 leading-relaxed">
          No published problems match your current search and filter criteria. Try adjusting your query or resetting filters.
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
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#121215]/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
      {/* Ambient top glowing line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/35 to-transparent pointer-events-none" />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.08] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-[#16161a]/90 select-none">
              <th className="py-3 px-3 w-12 text-center" title="Problem status">
                <span className="inline-flex items-center justify-center">
                  <CircleDot size={13} className="text-zinc-500" />
                </span>
              </th>
              <th className="py-3 px-3 w-12 text-center font-mono">
                <span className="inline-flex items-center justify-center">
                  <Hash size={12} className="text-zinc-500" />
                </span>
              </th>
              <th className="py-3 px-4">
                <span className="inline-flex items-center gap-1.5">
                  <Terminal size={12} className="text-zinc-500" />
                  <span>Title</span>
                </span>
              </th>
              <th className="py-3 px-4 w-32">
                <span>Difficulty</span>
              </th>
              <th className="py-3 px-4">
                <span className="inline-flex items-center gap-1.5">
                  <Layers size={12} className="text-zinc-500" />
                  <span>Topics</span>
                </span>
              </th>
              <th className="py-3 px-4 w-16 text-center" title="Original Problem Reference">
                <span className="inline-flex items-center justify-center">
                  <ExternalLink size={12} className="text-zinc-500" />
                </span>
              </th>
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
