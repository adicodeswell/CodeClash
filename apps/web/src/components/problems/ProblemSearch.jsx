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
    }, 300);

    return () => clearTimeout(timer);
  }, [term, value, onChange]);

  const handleClear = () => {
    setTerm("");
    onChange("");
  };

  return (
    <div className="relative flex items-center w-full md:w-80 lg:w-96">
      <Search size={16} className="absolute left-3.5 text-clash-subtle pointer-events-none" />
      <input
        type="text"
        placeholder="Search title or slug..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full py-2 pl-9 pr-9 bg-clash-card border border-clash-border rounded-lg text-clash-text text-xs sm:text-sm placeholder:text-clash-subtle focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition"
      />
      {term && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-0.5 rounded-full text-clash-subtle hover:text-clash-text hover:bg-white/10 transition cursor-pointer"
          title="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
