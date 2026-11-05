import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthForm } from "../components/AuthForm.jsx";
import { problemsAPI } from "../api/client.js";
import {
  Terminal,
  Zap,
  CheckCircle,
  Trophy,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";

export function LandingPage() {
  const { user } = useAuth();
  const [problemCount, setProblemCount] = useState(null);
  const [, setLoadingCount] = useState(false);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    problemsAPI
      .list({ limit: 1 })
      .then((data) => {
        if (isMounted && data && data.pagination) {
          setProblemCount(data.pagination.total);
        }
      })
      .catch(() => {
        // Handled silently
      })
      .finally(() => {
        if (isMounted) setLoadingCount(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {!user ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero & Value Props */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles size={13} className="text-brand-primary" />
              <span>Competitive Coding & Interview Prep</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-clash-text leading-[1.15] mb-5">
              Code. Battle. <br />
              <span className="text-brand-primary">
                Master DSA.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-clash-muted leading-relaxed mb-8 max-w-xl">
              Sharpen your algorithmic skills with curated competitive DSA
              problems, instant multi-language test validation, and head-to-head
              coding clashes.
            </p>

            {/* Feature points */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-clash-border flex items-center justify-center text-brand-primary shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-clash-text">Judge0 Sandboxed Execution</h4>
                  <p className="text-xs sm:text-sm text-clash-muted">Lightning-fast testing across C++, Python, Java & JS</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-clash-border flex items-center justify-center text-brand-primary shrink-0">
                  <Layers size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-clash-text">Curated Problem Bank</h4>
                  <p className="text-xs sm:text-sm text-clash-muted">Arrays, HashMaps, Two Pointers & dynamic sets</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-clash-border flex items-center justify-center text-brand-primary shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-clash-text">Exhaustive Test Coverage</h4>
                  <p className="text-xs sm:text-sm text-clash-muted">Edge cases, boundary conditions & hidden tests</p>
                </div>
              </div>
            </div>

            {/* Code Preview Mockup */}
            <div className="max-w-xl p-4 sm:p-5 rounded-2xl bg-clash-surface/90 border border-clash-border shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
                <span className="font-mono text-xs text-clash-subtle">Solution.py</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  <CheckCircle size={12} /> Accepted (0ms)
                </span>
              </div>
              <pre className="font-mono text-xs leading-relaxed text-slate-200 overflow-x-auto">
                <code>
                  <span className="text-emerald-400 font-semibold">class</span> <span className="text-teal-300 font-semibold">Solution</span>:{"\n"}
                  {"    "}<span className="text-emerald-400 font-semibold">def</span> <span className="text-teal-300">majorityElement</span>(self, nums):{"\n"}
                  {"        "}count, candidate = <span className="text-amber-400">0</span>, <span className="text-emerald-400/80 font-semibold">None</span>{"\n"}
                  {"        "}<span className="text-emerald-400 font-semibold">for</span> num <span className="text-emerald-400 font-semibold">in</span> nums:{"\n"}
                  {"            "}<span className="text-emerald-400 font-semibold">if</span> count == <span className="text-amber-400">0</span>: candidate = num{"\n"}
                  {"            "}count += <span className="text-amber-400">1</span> <span className="text-emerald-400 font-semibold">if</span> num == candidate <span className="text-emerald-400 font-semibold">else</span> -<span className="text-amber-400">1</span>{"\n"}
                  {"        "}<span className="text-emerald-400 font-semibold">return</span> candidate
                </code>
              </pre>
            </div>
          </div>

          {/* Right Auth Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AuthForm />
          </div>
        </div>
      ) : (
        /* Authenticated Dashboard Welcome State */
        <div className="flex justify-center pt-6">
          <div className="w-full max-w-3xl p-8 sm:p-10 rounded-2xl bg-clash-card border border-clash-border text-left shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-brand-primary flex items-center justify-center shrink-0">
                <Terminal size={24} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-clash-text tracking-tight mb-1">
                  Welcome back,{" "}
                  <span className="text-brand-primary">
                    @{user.username}
                  </span>
                  !
                </h2>
                <p className="text-sm text-clash-muted">Signed in as {user.email}</p>
              </div>
            </div>

            <div className="my-7 border-t border-clash-border"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Link
                to="/problems"
                className="p-5 rounded-xl bg-clash-surface border border-clash-border hover:border-white/20 transition flex flex-col justify-between gap-4 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-clash-text mb-1 group-hover:text-brand-primary transition-colors">
                    Problem Catalog
                  </h3>
                  <p className="text-xs text-clash-muted">
                    {problemCount !== null
                      ? `${problemCount} Published Problem(s) Ready`
                      : "Arrays & Hashing Problems Ready in DB"}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-brand-primary group-hover:underline transition">
                  <span>Explore Problems</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <div className="p-5 rounded-xl bg-clash-surface border border-clash-border hover:border-white/20 transition flex flex-col justify-between gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center">
                  <Trophy size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-clash-text mb-1">Arena Status</h3>
                  <p className="text-xs text-clash-muted">Rank: Challenger • Submissions: 0</p>
                </div>
                <div className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                  <span>Active Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
