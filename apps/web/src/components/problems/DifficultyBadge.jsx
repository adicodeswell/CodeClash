export function DifficultyBadge({ difficulty }) {
  const norm = (difficulty || "").toUpperCase();

  const config = {
    EASY: {
      label: "Easy",
      className: "text-diff-easy",
    },
    MEDIUM: {
      label: "Medium",
      className: "text-diff-medium",
    },
    HARD: {
      label: "Hard",
      className: "text-diff-hard",
    },
  };

  const current = config[norm] || {
    label: norm || "Unknown",
    className: "text-zinc-400",
  };

  return (
    <span className={`text-xs sm:text-[13px] font-medium select-none ${current.className}`}>
      {current.label}
    </span>
  );
}
