import { Link } from "react-router-dom";
import { Code2, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-clash-border bg-clash-bg text-clash-muted select-none mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary group-hover:border-brand-primary/60 transition">
                <Code2 size={13} />
              </div>
              <span className="text-sm font-bold tracking-tight text-clash-text">
                Code<span className="text-brand-primary">Clash</span>
              </span>
            </Link>
            <span className="text-zinc-700 select-none">|</span>
            <span className="text-zinc-500 font-normal">
              © {currentYear} CodeClash
            </span>
          </div>

          {/* Platform & Source Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-zinc-400">
            <Link to="/problems" className="hover:text-brand-primary transition-colors">
              Problems
            </Link>
            <span className="text-zinc-700 select-none">|</span>
            <Link to="/submissions" className="hover:text-brand-primary transition-colors">
              Submissions
            </Link>
            <span className="text-zinc-700 select-none">|</span>
            <a
              href="https://github.com/adicodeswell/CodeClash"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition-colors inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink size={11} className="text-zinc-500" />
            </a>
            <span className="text-zinc-700 select-none">|</span>
            <a
              href="https://github.com/adicodeswell/CodeClash/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition-colors inline-flex items-center gap-1"
            >
              <span>Issues</span>
              <ExternalLink size={11} className="text-zinc-500" />
            </a>
          </nav>

          {/* Simple tagline */}
          <div className="text-zinc-500 text-[11px] text-center sm:text-right">
            DSA Practice Platform
          </div>
        </div>
      </div>
    </footer>
  );
}
