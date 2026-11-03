import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProblemBySlug } from "../services/problems.api.js";
import { runCode, submitCode } from "../services/submissions.api.js";
import { ArenaHeader } from "../components/arena/ArenaHeader.jsx";
import { ProblemMetadata } from "../components/problems/ProblemMetadata.jsx";
import { ProblemStatement } from "../components/problems/ProblemStatement.jsx";
import { ProblemExamples } from "../components/problems/ProblemExamples.jsx";
import { ProblemConstraints } from "../components/problems/ProblemConstraints.jsx";
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
    },
  });

  const activeSubmission = polledSubmission || submissionResult;

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
                <ProblemExamples rawMarkdown={problem.statement} />
                <ProblemConstraints rawMarkdown={problem.statement} />
              </>
            ) : (
              <div className="space-y-4">
                {activeSubmission ? (
                  <div className="rounded-xl border border-clash-border bg-clash-surface/60 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-clash-border pb-3">
                      <div className="flex items-center gap-2">
                        {activeSubmission.verdict === "ACCEPTED" ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : activeSubmission.status === "COMPLETED" ? (
                          <AlertCircle size={18} className="text-red-400" />
                        ) : (
                          <Clock size={18} className="text-brand-primary animate-pulse" />
                        )}
                        <span
                          className={`font-bold text-sm ${
                            activeSubmission.verdict === "ACCEPTED"
                              ? "text-emerald-400"
                              : activeSubmission.status === "COMPLETED"
                              ? "text-red-400"
                              : "text-brand-primary"
                          }`}
                        >
                          {activeSubmission.verdict || activeSubmission.status}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-clash-muted">
                        {activeSubmission.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5">
                        <div className="text-clash-muted text-[11px]">Language</div>
                        <div className="font-semibold text-clash-text uppercase mt-0.5">
                          {activeSubmission.language || selectedLanguage}
                        </div>
                      </div>
                      <div className="rounded-lg bg-black/20 p-2.5 border border-white/5">
                        <div className="text-clash-muted text-[11px]">Test Cases</div>
                        <div className="font-semibold text-clash-text mt-0.5">
                          {activeSubmission.passedTestCount != null
                            ? `${activeSubmission.passedTestCount} / ${activeSubmission.totalTestCount}`
                            : "Evaluating..."}
                        </div>
                      </div>
                      {activeSubmission.runtimeMs != null && (
                        <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex items-center gap-2">
                          <Zap size={14} className="text-amber-400" />
                          <div>
                            <div className="text-clash-muted text-[10px]">Runtime</div>
                            <div className="font-bold text-clash-text font-mono text-xs">
                              {activeSubmission.runtimeMs} ms
                            </div>
                          </div>
                        </div>
                      )}
                      {activeSubmission.memoryKb != null && (
                        <div className="rounded-lg bg-black/20 p-2.5 border border-white/5 flex items-center gap-2">
                          <Cpu size={14} className="text-blue-400" />
                          <div>
                            <div className="text-clash-muted text-[10px]">Memory</div>
                            <div className="font-bold text-clash-text font-mono text-xs">
                              {(activeSubmission.memoryKb / 1024).toFixed(1)} MB
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-clash-muted">
                    <Inbox size={28} className="mx-auto mb-2 text-clash-subtle" />
                    <h4 className="text-sm font-bold text-clash-text mb-1">
                      No Active Submissions
                    </h4>
                    <p className="text-xs max-w-xs mx-auto text-clash-muted">
                      Submit a solution using the top bar to evaluate it against hidden test cases and view real-time verdicts here.
                    </p>
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
