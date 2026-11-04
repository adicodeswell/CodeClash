import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProblemBySlug } from "../services/problems.api.js";
import { runCode, submitCode, fetchMySubmissions } from "../services/submissions.api.js";
import { ArenaHeader } from "../components/arena/ArenaHeader.jsx";
import { ProblemMetadata } from "../components/problems/ProblemMetadata.jsx";
import { ProblemStatement } from "../components/problems/ProblemStatement.jsx";
import { SubmissionStatusBadge } from "../components/submissions/SubmissionStatus.jsx";
import { SubmissionMetrics } from "../components/submissions/SubmissionMetrics.jsx";
import { EditorToolbar } from "../components/editor/EditorToolbar.jsx";
import { CodeEditor } from "../components/editor/CodeEditor.jsx";
import { ExecutionResult } from "../components/editor/ExecutionResult.jsx";
import { useProblemDraft } from "../hooks/useProblemDraft.js";
import { useSubmissionStatus } from "../hooks/useSubmissionStatus.js";
import {
  FileText,
  Terminal,
  AlertCircle,
  Inbox,
  CheckCircle2,
  Clock,
  Cpu,
  Zap,
  RefreshCw,
} from "lucide-react";

export function ProblemDetailPage() {
  const { slug } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active language & editor tabs
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [mobileTab, setMobileTab] = useState("description"); // "description" | "editor"
  const [leftTab, setLeftTab] = useState("description"); // "description" | "submissions"

  // Separate states for Run Code vs Full Submission
  const [consoleTab, setConsoleTab] = useState("run"); // "run" | "submit"
  const [runResult, setRunResult] = useState(null);
  const [runError, setRunError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const [activeSubmissionId, setActiveSubmissionId] = useState(() => {
    return sessionStorage.getItem(`codeclash_submission_${slug}`) || null;
  });
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Problem submission history
  const [problemSubmissions, setProblemSubmissions] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const loadProblemSubmissions = useCallback(async () => {
    if (!slug) return;
    setLoadingHistory(true);
    try {
      const data = await fetchMySubmissions({ problemSlug: slug, limit: 30 });
      setProblemSubmissions(data.submissions || []);
    } catch (err) {
      console.error("Failed to load problem submissions:", err);
    } finally {
      setLoadingHistory(false);
    }
  }, [slug]);

  // Real-time polling hook
  const {
    submission: polledSubmission,
    isPolling,
    error: pollingError,
  } = useSubmissionStatus(activeSubmissionId, {
    pollInterval: 1000,
    onComplete: (completed) => {
      setSubmissionResult(completed);
      sessionStorage.removeItem(`codeclash_submission_${slug}`);
      loadProblemSubmissions();
    },
  });

  const activeSubmission = polledSubmission || submissionResult;

  // Load submissions whenever switching to submissions tab
  useEffect(() => {
    if (leftTab === "submissions") {
      loadProblemSubmissions();
    }
  }, [leftTab, loadProblemSubmissions]);

  // Fetch problem details by slug
  useEffect(() => {
    let isMounted = true;

    fetchProblemBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setProblem(data);
          // Set initial language from supported languages if python isn't enabled
          const available = Object.keys(data.languages || {}).filter(
            (k) => data.languages[k]?.enabled,
          );
          if (available.length > 0 && !available.includes("python")) {
            setSelectedLanguage(available[0]);
          }
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load problem");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Extract supported language keys
  const supportedLanguages = problem?.languages
    ? Object.keys(problem.languages).filter(
        (k) => problem.languages[k]?.enabled,
      )
    : ["python", "javascript", "cpp", "java"];

  // Starter template from backend for the currently selected language
  const starterTemplate =
    problem?.languages?.[selectedLanguage]?.starterTemplate || "";

  // Persistent code draft hook
  const { code, setCode, resetToStarter } = useProblemDraft(
    slug,
    selectedLanguage,
    starterTemplate,
  );

  // Run action handler (runs against real sample cases)
  const handleRun = useCallback(async () => {
    if (isRunning || isSubmitting || isPolling) return;
    setIsRunning(true);
    setRunError(null);
    setRunResult(null);
    setConsoleTab("run");

    try {
      const res = await runCode({
        problemSlug: slug,
        language: selectedLanguage,
        sourceCode: code,
      });
      setRunResult(res);
    } catch (err) {
      setRunError(err.message || "Execution failed");
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, isSubmitting, isPolling, slug, selectedLanguage, code]);

  // Submit action handler (submits to PostgreSQL queue and starts polling)
  const handleSubmit = useCallback(async () => {
    if (isRunning || isSubmitting || isPolling) return;
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionResult(null);
    setConsoleTab("submit");

    try {
      const res = await submitCode({
        problemSlug: slug,
        language: selectedLanguage,
        sourceCode: code,
      });

      // res is { id, status: "QUEUED" }
      setSubmissionResult(res);
      setActiveSubmissionId(res.id);
      sessionStorage.setItem(`codeclash_submission_${slug}`, res.id);
    } catch (err) {
      setSubmissionError(err.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  }, [isRunning, isSubmitting, isPolling, slug, selectedLanguage, code]);

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to Run
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRun]);

  // Loading View
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-clash-bg text-clash-muted gap-3">
        <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
        <span className="text-xs font-semibold">
          Loading problem workspace...
        </span>
      </div>
    );
  }

  // Error View
  if (error || !problem) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-clash-bg p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-status-error/10 border border-status-error/25 flex items-center justify-center text-status-error mb-4">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-xl font-bold text-clash-text mb-2">
          Problem Unavailable
        </h2>
        <p className="text-xs sm:text-sm text-clash-muted max-w-sm mb-6">
          {error ||
            "The problem could not be found or has not been published yet."}
        </p>
        <Link
          to="/problems"
          className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
        >
          Return to Problem Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-clash-bg overflow-hidden">
      {/* Top Navbar */}
      <ArenaHeader
        problemTitle={problem.title}
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting || isPolling}
      />

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden bg-clash-surface border-b border-clash-border px-2 py-1 gap-1">
        <button
          type="button"
          onClick={() => setMobileTab("description")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg ${
            mobileTab === "description"
              ? "bg-clash-card text-brand-primary border border-brand-primary/30"
              : "text-clash-muted"
          }`}
        >
          <FileText size={13} />
          <span>Description</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("editor")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg ${
            mobileTab === "editor"
              ? "bg-clash-card text-brand-primary border border-brand-primary/30"
              : "text-clash-muted"
          }`}
        >
          <Terminal size={13} />
          <span>Editor</span>
        </button>
      </div>

      {/* Main Workspace Split Pane */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Pane: Problem Description & Submissions */}
        <section
          className={`w-full lg:w-1/2 flex flex-col h-full border-r border-clash-border bg-clash-bg/50 ${
            mobileTab === "description" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Subheader tabs */}
          <div className="h-10 border-b border-clash-border bg-clash-surface/70 px-4 flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setLeftTab("description")}
              className={`flex items-center gap-1.5 text-xs font-semibold h-full border-b-2 transition cursor-pointer ${
                leftTab === "description"
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-clash-muted hover:text-clash-text"
              }`}
            >
              <FileText size={13} />
              <span>Description</span>
            </button>
            <button
              type="button"
              onClick={() => setLeftTab("submissions")}
              className={`flex items-center gap-1.5 text-xs font-semibold h-full border-b-2 transition cursor-pointer ${
                leftTab === "submissions"
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-clash-muted hover:text-clash-text"
              }`}
            >
              <Terminal size={13} />
              <span>Submissions</span>
            </button>
          </div>

          {/* Left Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {leftTab === "description" ? (
              <>
                <ProblemMetadata problem={problem} />
                <ProblemStatement statement={problem.statement} />
              </>
            ) : (
              <div className="space-y-4">
                {/* Active in-flight submission banner */}
                {activeSubmission && (activeSubmission.status === "QUEUED" || activeSubmission.status === "RUNNING") && (
                  <div className="rounded-xl border border-brand-primary/30 bg-brand-primary/10 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <SubmissionStatusBadge status={activeSubmission.status} />
                      <span className="text-[11px] font-mono text-clash-muted">
                        ID: {activeSubmission.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Evaluating your solution against all test cases in real-time...
                    </p>
                  </div>
                )}

                {/* Submissions Header */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-slate-200">
                    My Submissions ({problemSubmissions.length})
                  </span>
                  <button
                    type="button"
                    onClick={loadProblemSubmissions}
                    disabled={loadingHistory}
                    className="text-[11px] font-semibold text-brand-primary hover:text-brand-primary/80 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw size={12} className={loadingHistory ? "animate-spin" : ""} />
                    <span>Refresh</span>
                  </button>
                </div>

                {/* Submissions List / Empty State */}
                {loadingHistory && problemSubmissions.length === 0 ? (
                  <div className="py-12 text-center text-xs text-clash-muted flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
                    <span>Loading your submissions...</span>
                  </div>
                ) : problemSubmissions.length === 0 ? (
                  <div className="py-12 text-center text-clash-muted rounded-xl border border-clash-border bg-clash-surface/30 p-6">
                    <Inbox size={28} className="mx-auto mb-2 text-clash-subtle" />
                    <h4 className="text-sm font-bold text-clash-text mb-1">
                      No Submissions Yet
                    </h4>
                    <p className="text-xs max-w-xs mx-auto text-clash-muted">
                      Click "Submit" in the header to evaluate your solution against test cases.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {problemSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="rounded-xl border border-clash-border bg-clash-surface/60 p-4 space-y-2.5 hover:border-clash-border-light transition"
                      >
                        <div className="flex items-center justify-between">
                          <SubmissionStatusBadge status={sub.status} verdict={sub.verdict} />
                          <span className="text-[11px] font-mono text-clash-muted">
                            {new Date(sub.createdAt).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1 border-t border-white/5">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase font-mono text-[11px] text-slate-300">
                            {sub.language}
                          </span>
                          <SubmissionMetrics
                            runtimeMs={sub.runtimeMs}
                            memoryKb={sub.memoryKb}
                            passedTestCount={sub.passedTestCount}
                            totalTestCount={sub.totalTestCount}
                            compact={true}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right Pane: Editor, Toolbar & Execution Result Drawer */}
        <section
          className={`w-full lg:w-1/2 flex flex-col h-full bg-[#1e1e1e] ${
            mobileTab === "editor" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Editor Language & Action Bar */}
          <EditorToolbar
            supportedLanguages={supportedLanguages}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            onReset={resetToStarter}
            code={code}
            onRun={handleRun}
            onSubmit={handleSubmit}
            isRunning={isRunning}
            isSubmitting={isSubmitting || isPolling}
          />

          {/* Monaco Editor Container */}
          <div className="flex-1 overflow-hidden relative">
            <CodeEditor
              code={code}
              language={selectedLanguage}
              onChange={setCode}
            />
          </div>

          {/* Interactive Collapsible Execution Result Drawer */}
          <ExecutionResult
            consoleTab={consoleTab}
            onTabChange={setConsoleTab}
            runResult={runResult}
            runError={runError}
            isRunning={isRunning}
            submissionResult={activeSubmission}
            submissionError={submissionError || pollingError}
            isSubmitting={isSubmitting}
            isPolling={isPolling}
            sampleTestCases={problem?.sampleTestCases}
            onClose={() => {
              setRunResult(null);
              setRunError(null);
              setSubmissionResult(null);
              setSubmissionError(null);
              setActiveSubmissionId(null);
              sessionStorage.removeItem(`codeclash_submission_${slug}`);
            }}
          />
        </section>
      </div>
    </div>
  );
}
