import { useState } from "react";
import { RotateCcw, Copy, Check } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector.jsx";

export function EditorToolbar({
  supportedLanguages = ["python", "javascript", "cpp", "java"],
  selectedLanguage = "python",
  onSelectLanguage,
  onReset,
  code = "",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard write failed or denied
    }
  };

  return (
    <div className="h-10 border-b border-clash-border bg-clash-surface/90 px-3 flex items-center justify-between shrink-0 select-none">
      {/* Left: Language Selector */}
      <LanguageSelector
        supportedLanguages={supportedLanguages}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={onSelectLanguage}
      />

      {/* Right: Reset & Copy */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-clash-muted hover:text-clash-text hover:bg-white/5 transition cursor-pointer"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-clash-muted hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          title="Reset code to original starter template"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
