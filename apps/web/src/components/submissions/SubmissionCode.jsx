import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Copy, Check } from "lucide-react";

const MONACO_LANGUAGES = {
  python: "python",
  javascript: "javascript",
  cpp: "cpp",
  java: "java",
};

export function SubmissionCode({ sourceCode = "", language = "python" }) {
  const [copied, setCopied] = useState(false);
  const monacoLanguage = MONACO_LANGUAGES[language] || "plaintext";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lineCount = sourceCode ? sourceCode.split("\n").length : 0;

  return (
    <div className="rounded-2xl border border-clash-border bg-[#10151c] overflow-hidden flex flex-col shadow-sm">
      {/* Code Header Bar */}
      <div className="h-11 px-4 border-b border-clash-border/70 bg-clash-surface/90 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Submitted Source Code
          </span>
          <span className="text-[11px] font-mono text-clash-muted px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase">
            {language}
          </span>
          <span className="text-[11px] font-mono text-clash-subtle hidden sm:inline">
            ({lineCount} {lineCount === 1 ? "line" : "lines"})
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
          title="Copy exact submitted code to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} className="text-clash-muted" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Monaco Code Viewer in Read-Only Mode */}
      <div className="h-[420px] sm:h-[480px] w-full bg-[#1e1e1e] relative">
        <Editor
          height="100%"
          width="100%"
          language={monacoLanguage}
          theme="vs-dark"
          value={sourceCode}
          options={{
            readOnly: true,
            domReadOnly: true,
            fontSize: 13.5,
            fontFamily: "'Fira Code', ui-monospace, Menlo, Monaco, Consolas, monospace",
            fontLigatures: true,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            tabSize: language === "python" ? 4 : 2,
            padding: { top: 14, bottom: 14 },
            renderLineHighlight: "none",
            contextmenu: false,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-2 text-clash-muted text-xs">
              <div className="w-5 h-5 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
              <span>Loading submitted code...</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
