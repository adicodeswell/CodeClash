import { ShieldCheck } from "lucide-react";

function parseConstraintsFromMarkdown(raw = "") {
  if (!raw) return [];
  const constraintsMatch = raw.match(/## Constraints([\s\S]*?)(?=## Follow-up|$)/i);
  if (!constraintsMatch) return [];

  return constraintsMatch[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-") || line.startsWith("*"))
    .map((line) => line.replace(/^[-*]\s*/, ""));
}

export function ProblemConstraints({ constraints = [], rawMarkdown = "" }) {
  const items =
    constraints && constraints.length > 0
      ? constraints
      : parseConstraintsFromMarkdown(rawMarkdown);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-clash-text tracking-tight">
        <span className="w-1.5 h-3.5 rounded-full bg-brand-primary"></span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-brand-primary" />
          Constraints
        </span>
      </div>

      <ul className="space-y-2 rounded-xl border border-clash-border bg-clash-surface/70 p-4 text-xs font-sans">
        {items.map((item, idx) => {
          // Check if item contains backticked code
          const hasCode = item.includes("`");
          const cleaned = item.replace(/`/g, "");

          return (
            <li key={idx} className="flex items-start gap-2.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/70 shrink-0 mt-1.5"></span>
              {hasCode ? (
                <code className="font-mono text-emerald-300 text-[12px]">{cleaned}</code>
              ) : (
                <span className="leading-relaxed">{cleaned}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
