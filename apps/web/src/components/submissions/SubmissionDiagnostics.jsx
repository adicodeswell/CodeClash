import { useState } from "react";
import { Terminal, ChevronUp, ChevronDown, AlertCircle, Copy, Check } from "lucide-react";

export function SubmissionDiagnostics({ errorSummary }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  // If there are no diagnostics, render nothing
  if (!errorSummary || !errorSummary.trim()) {
    return null;
  }

  // Purge any accidental internal timing markers as defense in depth
  const cleanSummary = errorSummary
    .replace(/__CODECLASH_TIME_MS__:[^\n]*\n?/g, "")
    .trim();

  if (!cleanSummary) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl border border-red-500/25 bg-red-500/5 overflow-hidden text-xs shadow-sm">
      {/* Diagnostics Header */}
      <div className="px-4 py-3 bg-red-500/10 border-b border-red-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-400 font-bold">
          <Terminal size={15} />
          <span>Compiler / Runtime Diagnostics</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-red-300 hover:text-white bg-red-500/20 hover:bg-red-500/30 transition cursor-pointer"
            title="Copy diagnostics to clipboard"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-red-300 hover:text-white p-1 transition cursor-pointer"
            aria-label={isExpanded ? "Collapse diagnostics" : "Expand diagnostics"}
          >
            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Diagnostics Code Box */}
      {isExpanded && (
        <pre className="p-4 font-mono text-red-200 text-xs whitespace-pre-wrap overflow-x-auto max-h-64 leading-relaxed bg-black/40 selection:bg-red-500/30">
          <code>{cleanSummary}</code>
        </pre>
      )}
    </div>
  );
}
