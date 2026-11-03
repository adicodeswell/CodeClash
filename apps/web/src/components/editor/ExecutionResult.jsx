import { useState } from "react";
import {
  AlertCircle,
  Play,
  Send,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { SubmissionStatus } from "../submissions/SubmissionStatus.jsx";
import { SubmissionResult } from "../submissions/SubmissionResult.jsx";
import { RunTestCasesResult } from "../submissions/RunTestCasesResult.jsx";

export function ExecutionResult({
  consoleTab = "run",
  onTabChange,
  runResult,
  runError,
  isRunning,
  submissionResult,
  submissionError,
  isSubmitting,
  isPolling,
  sampleTestCases = [],
  onClose,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // If nothing has been run/submitted and no active state, don't show
  const hasRunActivity = isRunning || runResult || runError;
  const hasSubmitActivity = isSubmitting || isPolling || submissionResult || submissionError;

  if (!hasRunActivity && !hasSubmitActivity && sampleTestCases.length === 0) {
    return null;
  }

  const isCurrentTabRun = consoleTab === "run";

  return (
    <div
      className={`border-t border-clash-border bg-[#10151c]/95 backdrop-blur-md transition-all duration-200 flex flex-col z-30 select-none ${
        isCollapsed ? "h-10" : "max-h-[440px] h-[380px]"
      }`}
    >
      {/* Drawer Header Bar with Distinct Run vs Submit Tabs */}
      <div className="h-10 px-3 border-b border-clash-border flex items-center justify-between shrink-0 bg-clash-surface/80">
        <div className="flex items-center gap-1.5 h-full">
          {/* Tab 1: Run Preview */}
          <button
            type="button"
            onClick={() => onTabChange && onTabChange("run")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
              isCurrentTabRun
                ? "bg-clash-card text-brand-primary border border-brand-primary/30 shadow-sm"
                : "text-clash-muted hover:text-clash-text hover:bg-white/5"
            }`}
          >
            {isRunning ? (
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
            ) : (
              <Play size={12} className={isCurrentTabRun ? "text-brand-primary" : "text-clash-subtle"} />
            )}
            <span>Run Testcases</span>
            {runResult && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  runResult.verdict === "ACCEPTED"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {runResult.verdict === "ACCEPTED" ? "Passed" : "Failed"}
              </span>
            )}
          </button>

          {/* Tab 2: Submit Evaluation */}
          <button
            type="button"
            onClick={() => onTabChange && onTabChange("submit")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
              !isCurrentTabRun
                ? "bg-clash-card text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-clash-muted hover:text-clash-text hover:bg-white/5"
            }`}
          >
            {isSubmitting || isPolling || submissionResult?.status === "RUNNING" ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ) : (
              <Send size={12} className={!isCurrentTabRun ? "text-emerald-400" : "text-clash-subtle"} />
            )}
            <span>Submit Result</span>
            {submissionResult?.verdict && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  submissionResult.verdict === "ACCEPTED"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {submissionResult.verdict}
              </span>
            )}
            {submissionResult?.status === "QUEUED" && (
              <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-500/20 text-amber-400">
                Queued
              </span>
            )}
          </button>
        </div>

        {/* Controls: Collapse & Close */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-clash-subtle hover:text-clash-text hover:bg-white/5 transition cursor-pointer"
            title={isCollapsed ? "Expand test console" : "Collapse test console"}
          >
            {isCollapsed ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-clash-subtle hover:text-clash-text hover:bg-white/5 transition cursor-pointer"
              title="Close console"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Drawer Body (when not collapsed) */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* VIEW A: RUN CODE TEST CASES */}
          {isCurrentTabRun && (
            <>
              {isRunning && (
                <div className="h-full flex flex-col items-center justify-center py-12 gap-3 text-clash-muted text-xs">
                  <div className="w-7 h-7 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
                  <span>Executing code against sample test cases on Judge0...</span>
                </div>
              )}

              {runError && !isRunning && (
                <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-xs space-y-2">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>Run Failed</span>
                  </div>
                  <pre className="font-mono text-red-300 text-[11px] whitespace-pre-wrap overflow-x-auto">
                    {runError}
                  </pre>
                </div>
              )}

              {!isRunning && !runError && (
                <RunTestCasesResult
                  result={runResult}
                  sampleTestCases={sampleTestCases}
                />
              )}
            </>
          )}

          {/* VIEW B: SUBMIT EVALUATION */}
          {!isCurrentTabRun && (
            <>
              {isSubmitting && (
                <div className="h-full flex flex-col items-center justify-center py-12 gap-3 text-clash-muted text-xs">
                  <div className="w-7 h-7 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                  <span>Dispatching submission to database queue...</span>
                </div>
              )}

              {submissionError && !isSubmitting && (
                <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-xs space-y-2">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>Submission Error</span>
                  </div>
                  <pre className="font-mono text-red-300 text-[11px] whitespace-pre-wrap overflow-x-auto">
                    {submissionError}
                  </pre>
                </div>
              )}

              {/* In-Progress Submission (QUEUED or RUNNING) */}
              {submissionResult &&
                (submissionResult.status === "QUEUED" || submissionResult.status === "RUNNING") &&
                !isSubmitting && (
                  <SubmissionStatus
                    status={submissionResult.status}
                    submissionId={submissionResult.id}
                    totalTestCount={submissionResult.totalTestCount}
                  />
                )}

              {/* Completed Submission */}
              {submissionResult && submissionResult.status === "COMPLETED" && !isSubmitting && (
                <SubmissionResult submission={submissionResult} />
              )}

              {/* No submission yet */}
              {!isSubmitting && !submissionResult && !submissionError && (
                <div className="py-12 text-center text-clash-muted space-y-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                    <Send size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-clash-text">No active submission</h4>
                  <p className="text-[11px] max-w-xs mx-auto text-clash-muted">
                    Click <strong className="text-emerald-400 font-semibold">Submit</strong> in the toolbar above to run your solution against the full hidden benchmark test suite.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
