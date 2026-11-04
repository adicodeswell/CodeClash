import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Terminal,
  Layers,
  Zap,
  Cpu,
} from "lucide-react";
import { formatRuntime, formatMemory } from "./SubmissionMetrics.jsx";

/**
 * Renders the results of running code against the real sample test cases.
 * Displays pass/fail status per case, your output vs expected output, and compiler/runtime errors.
 */
export function RunTestCasesResult({ result, sampleTestCases = [] }) {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  // If we have an executed result, use its evaluated testCases; otherwise fallback to raw sample cases
  const testCases = result?.testCases || sampleTestCases;
  const isExecuted = Boolean(result && result.testCases);
  const activeCase = testCases[activeCaseIdx] || testCases[0];

  if (!testCases || testCases.length === 0) return null;

  return (
    <div className="space-y-3.5">
      {/* 1. Overall Execution Status Banner (when executed) */}
      {isExecuted && (
        <div
          className={`rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            result.verdict === "ACCEPTED"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/15 border-red-500/30 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {result.verdict === "ACCEPTED" ? (
              <CheckCircle2 size={18} className="text-emerald-400" />
            ) : (
              <AlertCircle size={18} className="text-red-400" />
            )}
            <span>
              {result.verdict === "ACCEPTED"
                ? "Accepted"
                : result.verdict === "COMPILATION_ERROR"
                ? "Compilation Error"
                : result.verdict === "RUNTIME_ERROR"
                ? "Runtime Error"
                : result.verdict === "TIME_LIMIT_EXCEEDED"
                ? "Time Limit Exceeded"
                : "Wrong Answer"}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/30 border border-white/10 ml-1">
              {result.passedTestCount} / {result.totalTestCount} passed
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            {formatRuntime(result.runtimeMs) && (
              <span className="flex items-center gap-1">
                <Zap size={13} className="text-amber-400" />
                {formatRuntime(result.runtimeMs)}
              </span>
            )}
            {formatMemory(result.memoryKb) && (
              <span className="flex items-center gap-1">
                <Cpu size={13} className="text-blue-400" />
                {formatMemory(result.memoryKb)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Global Error / Compilation Diagnostics (if any) */}
      {result?.errorSummary && (
        <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-red-400">
            <Terminal size={14} />
            <span>Diagnostics</span>
          </div>
          <pre className="font-mono text-red-200 text-[11px] whitespace-pre-wrap overflow-x-auto max-h-36 leading-relaxed">
            {result.errorSummary}
          </pre>
        </div>
      )}

      {/* 3. Test Cases Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-clash-border pb-2.5 overflow-x-auto">
        {testCases.map((tc, idx) => {
          const isSelected = activeCaseIdx === idx;
          const hasPassed = tc.passed === true;

          return (
            <button
              key={tc.id || tc.ordinal || idx}
              type="button"
              onClick={() => setActiveCaseIdx(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-clash-surface text-brand-primary border border-brand-primary/40 shadow-sm"
                  : "text-clash-muted hover:text-clash-text hover:bg-white/5"
              }`}
            >
              {isExecuted ? (
                hasPassed ? (
                  <CheckCircle2 size={13} className="text-emerald-400" />
                ) : (
                  <AlertCircle size={13} className="text-red-400" />
                )
              ) : (
                <Layers
                  size={13}
                  className={isSelected ? "text-brand-primary" : "text-clash-subtle"}
                />
              )}
              <span>Case {idx + 1}</span>
              {isExecuted && (
                <span
                  className={`text-[10px] font-bold ml-1 ${
                    hasPassed ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {hasPassed ? "Passed" : "Failed"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Active Test Case Details */}
      {activeCase && (
        <div className="space-y-3 font-sans text-xs">
          {/* Input Box */}
          <div>
            <div className="text-[11px] font-semibold text-clash-muted mb-1 select-none">
              Input:
            </div>
            <pre className="font-mono text-emerald-300 bg-clash-surface/90 border border-clash-border rounded-lg p-2.5 text-xs overflow-x-auto">
              <code>{activeCase.input}</code>
            </pre>
          </div>

          {/* Actual Output Box (when code has been run) */}
          {isExecuted && (
            <div>
              <div className="text-[11px] font-semibold text-clash-muted mb-1 select-none flex items-center justify-between">
                <span>Your Output:</span>
                <span
                  className={`font-mono text-[10px] font-bold ${
                    activeCase.passed ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {activeCase.passed ? "MATCHES EXPECTED" : "MISMATCH"}
                </span>
              </div>
              <pre
                className={`font-mono bg-clash-surface/90 border rounded-lg p-2.5 text-xs overflow-x-auto ${
                  activeCase.passed
                    ? "border-emerald-500/40 text-emerald-300"
                    : "border-red-500/40 text-red-300"
                }`}
              >
                <code>{activeCase.actualOutput || (activeCase.passed ? "—" : "(no output)")}</code>
              </pre>
            </div>
          )}

          {/* Expected Output Box */}
          <div>
            <div className="text-[11px] font-semibold text-clash-muted mb-1 select-none">
              Expected Output:
            </div>
            <pre className="font-mono text-slate-300 bg-clash-surface/90 border border-clash-border rounded-lg p-2.5 text-xs overflow-x-auto">
              <code>{activeCase.expectedOutput || activeCase.expected}</code>
            </pre>
          </div>

          {/* Specific testcase error if any (excluding timing markers) */}
          {(() => {
            const cleanErr = (activeCase.error || "")
              .replace(/__CODECLASH_TIME_MS__:[^\n]*\n?/g, "")
              .trim();
            if (!cleanErr) return null;
            return (
              <div className="rounded-lg border border-red-500/25 bg-red-500/10 p-2.5 text-xs">
                <div className="font-semibold text-red-400 mb-1">Standard Error:</div>
                <pre className="font-mono text-red-300 text-[11px] whitespace-pre-wrap">
                  {cleanErr}
                </pre>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
