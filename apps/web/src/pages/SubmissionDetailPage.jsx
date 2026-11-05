import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, RefreshCw, AlertCircle, FileQuestion } from "lucide-react";
import { fetchSubmissionDetail } from "../services/submissions.api.js";
import { SubmissionSummary } from "../components/submissions/SubmissionSummary.jsx";
import { SubmissionCode } from "../components/submissions/SubmissionCode.jsx";
import { SubmissionDiagnostics } from "../components/submissions/SubmissionDiagnostics.jsx";
import { SubmissionTestSummary } from "../components/submissions/SubmissionTestSummary.jsx";

export function SubmissionDetailPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const loadDetail = async () => {
    setLoading(true);
    setError(null);
    setIsNotFound(false);

    try {
      const data = await fetchSubmissionDetail(submissionId);
      setSubmission(data);
    } catch (err) {
      if (err.status === 404 || err.message?.toLowerCase().includes("not found")) {
        setIsNotFound(true);
      } else {
        setError(err.message || "Failed to load submission details.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [submissionId]);

  return (
    <div className="flex-1 bg-clash-bg text-clash-text py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div className="flex items-center gap-2 text-xs">
            <Link
              to="/submissions"
              className="inline-flex items-center gap-1.5 text-clash-muted hover:text-white transition font-medium"
            >
              <ArrowLeft size={14} />
              <span>All Submissions</span>
            </Link>
            {submission?.problem?.title && (
              <>
                <span className="text-clash-subtle">/</span>
                <Link
                  to={`/problems/${submission.problem.slug}`}
                  className="text-clash-muted hover:text-brand-primary transition font-medium truncate max-w-xs"
                >
                  {submission.problem.title}
                </Link>
              </>
            )}
            <span className="text-clash-subtle">/</span>
            <span className="text-slate-300 font-mono text-[11px]">
              #{submissionId}
            </span>
          </div>

          {submission?.problem?.slug && (
            <Link
              to={`/problems/${submission.problem.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white border border-white/10 transition cursor-pointer self-start sm:self-auto"
            >
              <span>Open in Problem Workspace</span>
              <ExternalLink size={13} />
            </Link>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
            <span className="text-xs font-semibold text-clash-muted">
              Loading submission details...
            </span>
          </div>
        )}

        {/* Not Found (404) or Ownership Denied State */}
        {!loading && isNotFound && (
          <div className="rounded-2xl border border-clash-border bg-clash-card p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <FileQuestion size={24} />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-100">
                Submission Not Found
              </h2>
              <p className="text-xs text-clash-muted leading-relaxed">
                This submission does not exist, or you do not have permission to view it.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                to="/submissions"
                className="px-4 py-2 rounded-lg text-xs font-medium bg-brand-primary text-slate-950 hover:bg-brand-secondary transition shadow-sm"
              >
                Go to My Submissions
              </Link>
              <Link
                to="/problems"
                className="px-4 py-2 rounded-lg text-xs font-medium bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10 transition"
              >
                Browse Problems
              </Link>
            </div>
          </div>
        )}

        {/* API Error State */}
        {!loading && !isNotFound && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-red-200">
                  Unable to load submission
                </h4>
                <p className="text-xs text-red-300/80">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={loadDetail}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw size={12} />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Submission Details Content */}
        {!loading && !isNotFound && submission && (
          <div className="space-y-6 animate-fadeIn">
            {/* 1. Summary Header Card */}
            <SubmissionSummary submission={submission} />

            {/* 2. Compiler or Runtime Diagnostics (if present) */}
            {submission.errorSummary && (
              <SubmissionDiagnostics errorSummary={submission.errorSummary} />
            )}

            {/* 3. Benchmark Test Suite Evaluation */}
            {submission.totalTestCount > 0 && (
              <SubmissionTestSummary
                passedTestCount={submission.passedTestCount}
                totalTestCount={submission.totalTestCount}
                verdict={submission.verdict}
                status={submission.status}
              />
            )}

            {/* 4. Submitted Code Viewer (Read-only Monaco) */}
            <SubmissionCode
              sourceCode={submission.sourceCode}
              language={submission.language}
            />
          </div>
        )}
      </div>
    </div>
  );
}
