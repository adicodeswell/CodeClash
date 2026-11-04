import { SubmissionRow } from "./SubmissionRow.jsx";

export function SubmissionList({ submissions }) {
  if (!submissions || submissions.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-clash-border bg-clash-surface/60 shadow-xl backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-clash-border bg-white/[0.02] text-[11px] font-bold uppercase tracking-wider text-clash-muted">
              <th className="py-3.5 px-4 sm:px-6">Problem</th>
              <th className="py-3.5 px-4">Status / Verdict</th>
              <th className="py-3.5 px-4">Language</th>
              <th className="py-3.5 px-4">Runtime</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Memory</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Submitted At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clash-border/30">
            {submissions.map((submission) => (
              <SubmissionRow key={submission.id} submission={submission} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
