import ReactMarkdown from "react-markdown";

export function ProblemStatement({ statement }) {
  if (!statement) {
    return (
      <div className="py-8 text-center text-xs text-clash-muted">
        No statement available for this problem.
      </div>
    );
  }

  // Strip leading "# <Title>" if present, since ProblemMetadata displays the title and badges at the top
  const content = statement.replace(/^#\s+[^\n]*\n+/, "").trim();

  return (
    <div className="problem-markdown text-left text-sm leading-relaxed text-slate-300">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-slate-100 mt-6 mb-3 pb-2 border-b border-clash-border">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold text-slate-100 mt-6 mb-3 pb-1 border-b border-clash-border/50">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-slate-200 mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed text-slate-300 text-sm">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-100">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-4 space-y-1.5 text-slate-300 text-sm">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-slate-300 text-sm">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/10 font-mono text-[12.5px] text-slate-200">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="p-3.5 my-3 rounded-lg bg-black/40 border border-clash-border font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed [&>code]:bg-transparent [&>code]:border-0 [&>code]:p-0">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brand-primary/60 pl-3.5 my-3 text-slate-400 italic text-sm">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-5 border-clash-border/60" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse text-sm border border-clash-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-clash-surface px-3 py-2 text-left font-semibold text-slate-200 border border-clash-border">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border border-clash-border text-slate-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
