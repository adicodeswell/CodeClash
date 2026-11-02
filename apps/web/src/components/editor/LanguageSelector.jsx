import { ChevronDown } from "lucide-react";

const LANGUAGE_LABELS = {
  python: "Python 3",
  javascript: "JavaScript (Node)",
  cpp: "C++ (GCC)",
  java: "Java (OpenJDK)",
};

export function LanguageSelector({
  supportedLanguages = ["python", "javascript", "cpp", "java"],
  selectedLanguage = "python",
  onSelectLanguage,
}) {
  return (
    <div className="relative flex items-center">
      <select
        value={selectedLanguage}
        onChange={(e) => onSelectLanguage(e.target.value)}
        className="appearance-none pl-3 pr-7 py-1 rounded-lg bg-clash-card border border-clash-border text-xs font-semibold text-clash-text focus:outline-none focus:border-brand-primary cursor-pointer hover:border-clash-border-light transition"
        aria-label="Select Programming Language"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang} className="bg-clash-card text-clash-text">
            {LANGUAGE_LABELS[lang] || lang}
          </option>
        ))}
      </select>
      <ChevronDown size={13} className="absolute right-2 text-clash-subtle pointer-events-none" />
    </div>
  );
}
