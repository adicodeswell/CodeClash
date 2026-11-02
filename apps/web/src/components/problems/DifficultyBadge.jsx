export function DifficultyBadge({ difficulty }) {
  const norm = (difficulty || "").toUpperCase();

  const config = {
    EASY: {
      label: "Easy",
      className: "text-diff-easy bg-diff-easy/10 border-diff-easy/25",
    },
    MEDIUM: {
      label: "Medium",
      className: "text-diff-medium bg-diff-medium/10 border-diff-medium/25",
    },
    HARD: {
      label: "Hard",
      className: "text-diff-hard bg-diff-hard/10 border-diff-hard/25",
    },
  };

  const badge = config[norm] || {
    label: norm || "Unknown",
    className: "text-clash-muted bg-white/5 border-clash-border",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}
