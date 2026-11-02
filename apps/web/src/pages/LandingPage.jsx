import { useState, useEffect } from "react";
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
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-primary bg-brand-primary/10 border border-brand-primary/30 px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles size={14} className="text-brand-secondary" />
              <span>Real-Time Competitive Coding Arena</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-clash-text leading-[1.1] mb-5">
              Code. Battle. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                Master DSA.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-clash-muted leading-relaxed mb-8 max-w-xl">
              Sharpen your algorithmic skills with curated LeetCode-style
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
                  <span className="text-pink-400 font-semibold">class</span> <span className="text-blue-400">Solution</span>:{"\n"}
                  {"    "}<span className="text-pink-400 font-semibold">def</span> <span className="text-blue-400">majorityElement</span>(self, nums):{"\n"}
                  {"        "}count, candidate = <span className="text-amber-400">0</span>, <span className="text-pink-400 font-semibold">None</span>{"\n"}
                  {"        "}<span className="text-pink-400 font-semibold">for</span> num <span className="text-pink-400 font-semibold">in</span> nums:{"\n"}
                  {"            "}<span className="text-pink-400 font-semibold">if</span> count == <span className="text-amber-400">0</span>: candidate = num{"\n"}
                  {"            "}count += <span className="text-amber-400">1</span> <span className="text-pink-400 font-semibold">if</span> num == candidate <span className="text-pink-400 font-semibold">else</span> -<span className="text-amber-400">1</span>{"\n"}
                  {"        "}<span className="text-pink-400 font-semibold">return</span> candidate
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
          <div className="w-full max-w-3xl p-8 sm:p-10 rounded-2xl bg-clash-card/80 border border-clash-border backdrop-blur-xl text-left shadow-2xl shadow-black/50">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/40 text-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20 shrink-0">
                <Terminal size={32} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-clash-text tracking-tight mb-1">
                  Welcome back,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                    @{user.username}
                  </span>
                  !
                </h2>
                <p className="text-sm text-clash-muted">Signed in as {user.email}</p>
              </div>
            </div>

            <div className="my-8 border-t border-clash-border"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="p-5 rounded-xl bg-clash-bg/60 border border-clash-border hover:border-brand-primary/40 transition flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-clash-text mb-1">Problem Catalog</h3>
                  <p className="text-xs sm:text-sm text-clash-muted">
                    {problemCount !== null
                      ? `${problemCount} Published Problem(s) Ready`
                      : "Arrays & Hashing Problems Ready in DB"}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md">
                  <span>Task 2 Ready</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-clash-bg/60 border border-clash-border hover:border-emerald-500/40 transition flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Trophy size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-clash-text mb-1">Arena Status</h3>
                  <p className="text-xs sm:text-sm text-clash-muted">Rank: Challenger • Submissions: 0</p>
                </div>
                <div className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  <span>Active Session</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
              <h4 className="text-sm font-bold text-indigo-200 mb-1">🚀 Ready for the next phase?</h4>
              <p className="text-xs sm:text-sm text-clash-muted leading-relaxed">
                Tailwind CSS and global design tokens are fully set up and connected with the backend. You can now build the Problem Catalog UI (Task 2) to display and filter all published problems.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
