import { Sparkles } from "lucide-react";

function parseExamplesFromMarkdown(raw = "") {
  if (!raw) return [];
  const examplesMatch = raw.match(/## Examples([\s\S]*?)(?=## Constraints|## Follow-up|$)/i);
  if (!examplesMatch) return [];

  const rawBlocks = examplesMatch[1].split(/(?=###\s+Example)/i).filter((b) => b.trim());

  return rawBlocks.map((b, idx) => {
    const titleMatch = b.match(/###\s+(Example\s+\d+)/i);
    const title = titleMatch ? titleMatch[1] : `Example ${idx + 1}`;
    const inputMatch = b.match(/\*\*Input:\*\*\s*(?:`([^`]+)`|([^\n]+))/i);
    const outputMatch = b.match(/\*\*Output:\*\*\s*(?:`([^`]+)`|([^\n]+))/i);
    const expMatch = b.match(/\*\*Explanation:\*\*\s*([\s\S]*?)(?=$|\n\n###)/i);

    return {
      title,
      input: inputMatch ? (inputMatch[1] || inputMatch[2]).trim() : "",
      output: outputMatch ? (outputMatch[1] || outputMatch[2]).trim() : "",
      explanation: expMatch ? expMatch[1].trim() : "",
    };
  });
}

export function ProblemExamples({ examples = [], rawMarkdown = "" }) {
  const items =
    examples && examples.length > 0
      ? examples
      : parseExamplesFromMarkdown(rawMarkdown);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold text-clash-text tracking-tight">
        <span className="w-1.5 h-3.5 rounded-full bg-brand-primary"></span>
        <span className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-brand-primary" />
          Examples
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.title || idx}
            className="rounded-xl border border-clash-border bg-clash-surface/70 p-4 text-xs font-sans space-y-2.5 transition hover:border-clash-border-light"
          >
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              {item.title}
            </div>

            {item.input && (
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-clash-muted font-semibold shrink-0 select-none">
                  Input:
                </span>
                <code className="font-mono text-emerald-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 break-all">
                  {item.input}
                </code>
              </div>
            )}

            {item.output && (
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="text-clash-muted font-semibold shrink-0 select-none">
                  Output:
                </span>
                <code className="font-mono text-mint-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 break-all">
                  {item.output}
                </code>
              </div>
            )}

            {item.explanation && (
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 text-slate-300">
                <span className="text-clash-muted font-semibold shrink-0 select-none">
                  Explanation:
                </span>
                <span className="leading-relaxed text-clash-muted">
                  {item.explanation.replace(/`/g, "")}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
