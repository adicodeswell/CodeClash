import { createElement } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Terminal,
  Info,
  HardDrive,
} from "lucide-react";

export function getVerdictConfig(verdict) {
  switch (verdict) {
    case "ACCEPTED":
      return {
        title: "Accepted",
        textClass: "text-emerald-400",
        className: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
        icon: createElement(CheckCircle2, { size: 15, className: "text-emerald-400 shrink-0" }),
      };
    case "WRONG_ANSWER":
      return {
        title: "Wrong Answer",
        textClass: "text-red-400",
        className: "bg-red-500/10 border-red-500/25 text-red-400",
        icon: createElement(AlertCircle, { size: 15, className: "text-red-400 shrink-0" }),
      };
    case "TIME_LIMIT_EXCEEDED":
      return {
        title: "Time Limit Exceeded",
        textClass: "text-amber-400",
        className: "bg-amber-500/10 border-amber-500/25 text-amber-400",
        icon: createElement(Clock, { size: 15, className: "text-amber-400 shrink-0" }),
      };
    case "MEMORY_LIMIT_EXCEEDED":
      return {
        title: "Memory Limit Exceeded",
        textClass: "text-amber-400",
        className: "bg-amber-500/10 border-amber-500/25 text-amber-400",
        icon: createElement(HardDrive, { size: 15, className: "text-amber-400 shrink-0" }),
      };
    case "COMPILATION_ERROR":
      return {
        title: "Compilation Error",
        textClass: "text-red-400",
        className: "bg-red-500/10 border-red-500/25 text-red-400",
        icon: createElement(Terminal, { size: 15, className: "text-red-400 shrink-0" }),
      };
    case "RUNTIME_ERROR":
      return {
        title: "Runtime Error",
        textClass: "text-red-400",
        className: "bg-red-500/10 border-red-500/25 text-red-400",
        icon: createElement(AlertCircle, { size: 15, className: "text-red-400 shrink-0" }),
      };
    case "JUDGE_ERROR":
      return {
        title: "Judge Error",
        textClass: "text-slate-400",
        className: "bg-white/5 border-white/10 text-slate-300",
        icon: createElement(AlertCircle, { size: 15, className: "text-slate-400 shrink-0" }),
      };
    default:
      return {
        title: verdict || "Completed",
        textClass: "text-brand-primary",
        className: "bg-white/5 border-white/10 text-slate-200",
        icon: createElement(Info, { size: 15, className: "text-brand-primary shrink-0" }),
      };
  }
}
