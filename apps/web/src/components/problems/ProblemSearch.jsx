import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export function ProblemSearch({ value = "", onChange }) {
  const [term, setTerm] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  // Sync state during render when prop changes (React recommended pattern)
  if (value !== prevValue) {
    setPrevValue(value);
    setTerm(value);
  }

  useEffect(() => {
    if (term === value) return;

    const timer = setTimeout(() => {
      onChange(term);
    }, 250);

    return () => clearTimeout(timer);
  }, [term, value, onChange]);

  const handleClear = () => {
    setTerm("");
    onChange("");
  };

  return (
    <div className="relative flex items-center w-full md:w-80 lg:w-96">
      <Search size={15} className="absolute left-3.5 text-zinc-500 pointer-events-none" />
      <input
        type="text"
        placeholder="Search by title or slug..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full py-2 pl-9 pr-9 bg-[#141417] border border-white/[0.08] rounded-xl text-zinc-200 text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 hover:border-white/20 transition shadow-inner"
      />
      {term && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-1 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-white/10 transition cursor-pointer"
          title="Clear search"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
