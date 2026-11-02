import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronUp,
  ChevronDown,
  X,
  Info,
  Layers,
} from "lucide-react";

export function ExecutionResult({ result, error, isRunning, isSubmitting, onClose }) {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // If nothing has been run/submitted and no active state, don't show
  if (!isRunning && !isSubmitting && !result && !error) {
    return null;
  }

  const testCases = result?.testCases || [];
  const activeCase = testCases[activeCaseIdx] || testCases[0];

  return (
    <div
      className={`border-t border-clash-border bg-[#10151c]/95 backdrop-blur-md transition-all duration-200 flex flex-col z-30 select-none ${
        isCollapsed ? "h-10" : "max-h-[380px] h-[340px]"
      }`}
    >
      {/* Drawer Header Bar */}
      <div className="h-10 px-4 border-b border-clash-border flex items-center justify-between shrink-0 bg-clash-surface/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-clash-text tracking-wide uppercase flex items-center gap-2">
            {isRunning ? (
              <span className="flex items-center gap-1.5 text-brand-primary">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                Loading Sample Test Cases...
              </span>
            ) : isSubmitting ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Registering Submission...
              </span>
            ) : error ? (
              <span className="flex items-center gap-1.5 text-red-400">
                <AlertCircle size={14} />
                Execution Error
              </span>
            ) : result?.status === "QUEUED" ? (
              <span className="flex items-center gap-1.5 text-brand-primary">
                <Clock size={14} />
                Submission Queued (Judge0)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-brand-primary">
                <CheckCircle2 size={14} className="text-brand-primary" />
                Sample Testcases Ready (3 Cases)
              </span>
            )}
          </span>
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
          {/* 1. Loading States */}
          {(isRunning || isSubmitting) && (
            <div className="h-full flex flex-col items-center justify-center py-12 gap-3 text-clash-muted text-xs">
              <div className="w-7 h-7 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
              <span>
                {isRunning
                  ? "Initializing sample test cases..."
                  : "Dispatching submission to Judge0 queue..."}
              </span>
            </div>
          )}

          {/* 2. Error Display */}
          {error && !isRunning && !isSubmitting && (
            <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-xs space-y-2">
              <div className="font-bold text-red-400 flex items-center gap-1.5">
                <AlertCircle size={14} />
                <span>Execution Failed</span>
              </div>
              <pre className="font-mono text-red-300 text-[11px] whitespace-pre-wrap overflow-x-auto">
                {error}
              </pre>
            </div>
          )}

          {/* 3. Queued Submission State (Phase 6 boundary) */}
          {result?.status === "QUEUED" && !isRunning && !isSubmitting && (
            <div className="rounded-xl border border-brand-primary/30 bg-brand-primary/10 p-4 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-brand-primary font-bold">
                <Clock size={16} />
                <span>Submission Registered (ID: {result.submissionId})</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {result.phaseNotice ||
                  "Submission queued. The Judge0 worker engine will evaluate all hidden test cases in Phase 6."}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-clash-muted pt-1 border-t border-brand-primary/20">
                <span>Submitted at: {new Date(result.submittedAt).toLocaleTimeString()}</span>
                <span>•</span>
                <span>Language: {result.language}</span>
              </div>
            </div>
          )}

          {/* 4. Sample Test Cases Output (Shows 3 Cases) */}
          {testCases.length > 0 && !isRunning && !isSubmitting && (
            <div className="space-y-3">
              {/* Notice Banner: Phase 6 Judge0 Integration */}
              <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/10 px-3.5 py-2.5 flex items-start gap-2.5 text-xs">
                <Info size={15} className="text-brand-primary shrink-0 mt-0.5" />
                <div className="text-slate-300 leading-relaxed">
                  <span className="font-semibold text-brand-secondary">
                    Phase 5 Interface Ready:
                  </span>{" "}
                  {result.phaseNotice}
                </div>
              </div>

              {/* 3 Test Case Tabs */}
              <div className="flex items-center gap-2 border-b border-clash-border pb-2.5">
                {testCases.map((tc, idx) => (
                  <button
                    key={tc.id || idx}
                    type="button"
                    onClick={() => setActiveCaseIdx(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeCaseIdx === idx
                        ? "bg-clash-surface text-brand-primary border border-brand-primary/40 shadow-sm"
                        : "text-clash-muted hover:text-clash-text hover:bg-white/5"
                    }`}
                  >
                    <Layers size={12} className={activeCaseIdx === idx ? "text-brand-primary" : "text-clash-subtle"} />
                    <span>Case {idx + 1}</span>
                  </button>
                ))}
              </div>

              {/* Active Case Details */}
              {activeCase && (
                <div className="space-y-3 font-sans text-xs">
                  {/* Input Block */}
                  <div>
                    <div className="text-[11px] font-semibold text-clash-muted mb-1 select-none">
                      Sample Input:
                    </div>
                    <pre className="font-mono text-emerald-300 bg-clash-surface/90 border border-clash-border rounded-lg p-2.5 text-xs overflow-x-auto">
                      <code>{activeCase.input}</code>
                    </pre>
                  </div>

                  {/* Expected Output Block */}
                  <div>
                    <div className="text-[11px] font-semibold text-clash-muted mb-1 select-none">
                      Expected Output:
                    </div>
                    <pre className="font-mono text-slate-300 bg-clash-surface/90 border border-clash-border rounded-lg p-2.5 text-xs overflow-x-auto">
                      <code>{activeCase.expected}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
