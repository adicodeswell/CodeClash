import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchMySubmissions } from "../services/submissions.api.js";
import { SubmissionList } from "../components/submissions/SubmissionList.jsx";
import { SubmissionPagination } from "../components/submissions/SubmissionPagination.jsx";
import { History, AlertCircle, Inbox, Code2, RefreshCw } from "lucide-react";

export function SubmissionHistoryPage() {
  const [submissions, setSubmissions] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadInitialSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMySubmissions({ limit: 15 });
      setSubmissions(data.submissions || []);
      setNextCursor(data.nextCursor || null);
    } catch (err) {
      setError(err.message || "Failed to load submission history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialSubmissions();
  }, [loadInitialSubmissions]);

  const handleLoadMore = async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await fetchMySubmissions({ cursor: nextCursor, limit: 15 });
      setSubmissions((prev) => [...prev, ...(data.submissions || [])]);
      setNextCursor(data.nextCursor || null);
    } catch (err) {
      setError(err.message || "Failed to load additional submissions");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full text-left">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-clash-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
              <History size={18} />
            </div>
            <h1 className="text-2xl font-extrabold text-clash-text tracking-tight">
              My Submissions
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-clash-muted">
            Track your code judging results, verdicts, and performance metrics across all challenges.
          </p>
        </div>

        <button
          type="button"
          onClick={loadInitialSubmissions}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-clash-border bg-clash-surface text-xs font-semibold text-slate-300 hover:text-white hover:border-brand-primary/40 transition disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-clash-muted">
            Loading submission history...
          </span>
        </div>
      ) : error ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center rounded-2xl border border-status-error/20 bg-status-error/5 p-8 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-xl bg-status-error/10 border border-status-error/25 flex items-center justify-center text-status-error mb-3">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-1">
            Unable to Load Submissions
          </h3>
          <p className="text-xs text-clash-muted mb-4 max-w-sm">
            {error}
          </p>
          <button
            type="button"
            onClick={loadInitialSubmissions}
            className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : submissions.length === 0 ? (
        <div className="min-h-[350px] flex flex-col items-center justify-center rounded-2xl border border-clash-border bg-clash-surface/40 p-10 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-clash-border flex items-center justify-center text-clash-muted mb-4">
            <Inbox size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-1">
            No Submissions Yet
          </h3>
          <p className="text-xs text-clash-muted mb-6 leading-relaxed">
            You haven't submitted any solutions yet. Choose a problem from the catalog and test your skills in the arena!
          </p>
          <Link
            to="/problems"
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shadow-lg shadow-brand-primary/20"
          >
            <Code2 size={16} />
            <span>Browse Problems</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <SubmissionList submissions={submissions} />
          <SubmissionPagination
            hasNext={Boolean(nextCursor)}
            loadingMore={loadingMore}
            onLoadMore={handleLoadMore}
            currentCount={submissions.length}
          />
        </div>
      )}
    </div>
  );
}
