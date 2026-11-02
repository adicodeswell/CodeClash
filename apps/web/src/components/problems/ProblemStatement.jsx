import ReactMarkdown from "react-markdown";
import { HelpCircle } from "lucide-react";

function parseDescriptionFromMarkdown(raw = "") {
  if (!raw) return "";
  if (raw.includes("## Examples")) {
    const descMatch = raw.match(/## Problem Description([\s\S]*?)(?=## Examples)/i);
    if (descMatch) {
      return descMatch[1].trim();
    }
    const beforeExamples = raw.split(/## Examples/i)[0];
    return beforeExamples.replace(/^#\s+[^\n]*\n+/, "").trim();
  }
  return raw;
}

function parseFollowUpFromMarkdown(raw = "") {
  if (!raw) return "";
  const match = raw.match(/## Follow-up([\s\S]*?)$/i);
  return match ? match[1].trim() : "";
}

export function ProblemStatement({ statement }) {
  if (!statement) {
    return (
      <div className="py-8 text-center text-xs text-clash-muted">
        No statement available for this problem.
      </div>
    );
  }

  const description = parseDescriptionFromMarkdown(statement);
  const followUp = parseFollowUpFromMarkdown(statement);

  return (
    <div className="space-y-6">
      {/* Main Description */}
      <div className="problem-markdown prose-invert text-left text-xs sm:text-sm leading-relaxed text-slate-300">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold text-clash-text mt-4 mb-3 border-b border-clash-border pb-2">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-base font-bold text-clash-text mt-5 mb-2 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-brand-primary"></span>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-sm font-semibold text-emerald-300 mt-3 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => <p className="mb-3.5 leading-relaxed">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-5 mb-4 space-y-1.5 text-slate-300">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-slate-300">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="leading-normal">{children}</li>,
            code: ({ inline, children }) => {
              if (inline) {
                return (
                  <code className="px-1.5 py-0.5 rounded-md bg-clash-surface border border-clash-border font-mono text-[12px] text-emerald-300">
                    {children}
                  </code>
                );
              }
              return (
                <pre className="p-3 my-3 rounded-xl bg-clash-surface/90 border border-clash-border font-mono text-xs overflow-x-auto text-emerald-300">
                  <code>{children}</code>
                </pre>
              );
            },
            pre: ({ children }) => <div className="my-3">{children}</div>,
            strong: ({ children }) => (
              <strong className="font-bold text-clash-text">{children}</strong>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-brand-primary/50 pl-3 my-3 text-clash-muted italic">
                {children}
              </blockquote>
            ),
          }}
        >
          {description}
        </ReactMarkdown>
      </div>

      {/* Follow-up Note (if present) */}
      {followUp && (
        <div className="rounded-xl border border-clash-border bg-clash-card/70 p-4 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-brand-primary font-bold">
            <HelpCircle size={14} />
            <span>Follow-up</span>
          </div>
          <div className="text-clash-muted leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="m-0">{children}</p>,
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/5 font-mono text-emerald-300 text-[12px]">
                    {children}
                  </code>
                ),
              }}
            >
              {followUp}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
