import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Swords, Code2 } from "lucide-react";

export function ProblemDetailPage() {
  const { slug } = useParams();

  const formattedTitle = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Problem";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full text-left">
      <Link
        to="/problems"
        className="inline-flex items-center gap-2 text-xs font-semibold text-brand-primary hover:text-brand-secondary mb-6 transition"
      >
        <ArrowLeft size={16} />
        <span>Back to Problem Catalog</span>
      </Link>

      <div className="p-8 rounded-2xl bg-clash-card border border-clash-border backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
            <Code2 size={20} />
          </div>
          <div>
            <span className="text-xs font-mono text-clash-subtle">{slug}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-clash-text tracking-tight">
              {formattedTitle}
            </h1>
          </div>
        </div>

        <div className="my-6 border-t border-clash-border"></div>

        <div className="p-6 rounded-xl bg-clash-surface/60 border border-clash-border text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-3">
            <Swords size={24} />
          </div>
          <h3 className="text-lg font-bold text-clash-text mb-1">CodeClash Arena Workspace</h3>
          <p className="text-xs sm:text-sm text-clash-muted max-w-md mx-auto mb-4">
            Problem workspace, multi-language editor (Monaco), and Judge0 test runner will be wired here in the next task.
          </p>
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Explore Other Problems
          </Link>
        </div>
      </div>
    </div>
  );
}
