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
import {
  FileText,
  Terminal,
  AlertCircle,
  Inbox,
  Code,
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

  // Execution states (Run & Submit)
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [executionError, setExecutionError] = useState(null);

  // Fetch problem details by slug
  useEffect(() => {
    let isMounted = true;

    fetchProblemBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setProblem(data);
          // Set initial language from supported languages if python isn't enabled
          const available = Object.keys(data.languages || {}).filter(
            (k) => data.languages[k]?.enabled
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
    ? Object.keys(problem.languages).filter((k) => problem.languages[k]?.enabled)
    : ["python", "javascript", "cpp", "java"];

  // Starter template from backend for the currently selected language
  const starterTemplate =
    problem?.languages?.[selectedLanguage]?.starterTemplate || "";

  // Persistent code draft hook
  const { code, setCode, resetToStarter } = useProblemDraft(
    slug,
    selectedLanguage,
    starterTemplate
  );

  // Run action handler
  const handleRun = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setExecutionError(null);
    setExecutionResult(null);

    try {
      const res = await runCode({
        problemSlug: slug,
        language: selectedLanguage,
        sourceCode: code,
      });
      setExecutionResult(res);
    } catch (err) {
      setExecutionError(err.message || "Execution failed");
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, isSubmitting, slug, selectedLanguage, code]);

  // Submit action handler
  const handleSubmit = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setExecutionError(null);
    setExecutionResult(null);

    try {
      const res = await submitCode({
        problemSlug: slug,
        language: selectedLanguage,
        sourceCode: code,
      });
      setExecutionResult(res);
    } catch (err) {
      setExecutionError(err.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  }, [isRunning, isSubmitting, slug, selectedLanguage, code]);

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
        <span className="text-xs font-semibold">Loading problem workspace...</span>
      </div>
    );
  }

  // Error / 404 View
  if (error || !problem) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-clash-bg p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-status-error/10 border border-status-error/25 flex items-center justify-center text-status-error mb-4">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-xl font-bold text-clash-text mb-2">Problem Unavailable</h2>
        <p className="text-xs sm:text-sm text-clash-muted max-w-sm mb-6">
          {error || "The problem could not be found or has not been published yet."}
        </p>
        <Link
          to="/problems"
          className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
        >
          Return to Problem Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-clash-bg overflow-hidden">
      {/* 1. Custom Arena Top Bar */}
      <ArenaHeader
        problemTitle={problem.title}
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />

      {/* Mobile Tab Switcher (< lg screens) */}
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
          <Code size={13} />
          <span>Editor</span>
        </button>
      </div>

      {/* 2. Main Two-Column Split Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Pane: Problem Statement & Metadata */}
        <section
          className={`w-full lg:w-1/2 flex flex-col h-full border-r border-clash-border bg-clash-bg/50 ${
            mobileTab === "description" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Left Pane Tabs */}
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
              <div className="py-12 text-center text-clash-muted">
                <Inbox size={28} className="mx-auto mb-2 text-clash-subtle" />
                <h4 className="text-sm font-bold text-clash-text mb-1">
                  {executionResult?.status === "QUEUED"
                    ? "Submission Recorded"
                    : "No Submissions Yet"}
                </h4>
                <p className="text-xs max-w-xs mx-auto text-clash-muted">
                  {executionResult?.status === "QUEUED"
                    ? `Submission ID: ${executionResult.submissionId}. Registered for Judge0 processing.`
                    : "Submit a solution using the top bar to view execution benchmarks and verdicts here."}
                </p>
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
            isSubmitting={isSubmitting}
          />

          {/* Monaco Editor Container */}
          <div className="flex-1 overflow-hidden relative">
            <CodeEditor
              code={code}
              language={selectedLanguage}
              onChange={setCode}
            />
          </div>

          {/* Interactive Collapsible Execution Result Drawer (Shows 3 Test Cases) */}
          <ExecutionResult
            result={executionResult}
            error={executionError}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            onClose={() => {
              setExecutionResult(null);
              setExecutionError(null);
            }}
          />
        </section>
      </div>
    </div>
  );
}
