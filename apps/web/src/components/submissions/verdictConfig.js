import { createElement } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Terminal,
  Info,
} from "lucide-react";

export function getVerdictConfig(verdict) {
  switch (verdict) {
    case "ACCEPTED":
      return {
        title: "Accepted",
        className: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
        icon: createElement(CheckCircle2, { size: 16, className: "text-emerald-400" }),
      };
    case "WRONG_ANSWER":
      return {
        title: "Wrong Answer",
        className: "bg-red-500/15 border-red-500/30 text-red-400",
        icon: createElement(AlertCircle, { size: 16, className: "text-red-400" }),
      };
    case "TIME_LIMIT_EXCEEDED":
      return {
        title: "Time Limit Exceeded",
        className: "bg-amber-500/15 border-amber-500/30 text-amber-400",
        icon: createElement(Clock, { size: 16, className: "text-amber-400" }),
      };
    case "COMPILATION_ERROR":
      return {
        title: "Compilation Error",
        className: "bg-red-500/15 border-red-500/30 text-red-400",
        icon: createElement(Terminal, { size: 16, className: "text-red-400" }),
      };
    case "RUNTIME_ERROR":
      return {
        title: "Runtime Error",
        className: "bg-red-500/15 border-red-500/30 text-red-400",
        icon: createElement(AlertCircle, { size: 16, className: "text-red-400" }),
      };
    case "JUDGE_ERROR":
      return {
        title: "Judge Execution Error",
        className: "bg-slate-500/20 border-slate-500/30 text-slate-300",
        icon: createElement(AlertCircle, { size: 16, className: "text-slate-400" }),
      };
    default:
      return {
        title: verdict || "Completed",
        className: "bg-brand-primary/15 border-brand-primary/30 text-brand-primary",
        icon: createElement(Info, { size: 16, className: "text-brand-primary" }),
      };
  }
}
