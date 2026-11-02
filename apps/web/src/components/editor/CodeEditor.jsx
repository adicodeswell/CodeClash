import Editor from "@monaco-editor/react";

const MONACO_LANGUAGES = {
  python: "python",
  javascript: "javascript",
  cpp: "cpp",
  java: "java",
};

export function CodeEditor({ code = "", language = "python", onChange, readOnly = false }) {
  const monacoLanguage = MONACO_LANGUAGES[language] || "plaintext";

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#1e1e1e]">
      <Editor
        height="100%"
        width="100%"
        language={monacoLanguage}
        theme="vs-dark"
        value={code}
        onChange={(val) => onChange && onChange(val || "")}
        options={{
          readOnly,
          fontSize: 13.5,
          fontFamily: "'Fira Code', ui-monospace, Menlo, Monaco, Consolas, monospace",
          fontLigatures: true,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          minimap: { enabled: false },
          tabSize: language === "python" ? 4 : 2,
          insertSpaces: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "line",
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
        loading={
          <div className="flex flex-col items-center justify-center h-full gap-2 text-clash-muted text-xs">
            <div className="w-5 h-5 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
            <span>Loading editor...</span>
          </div>
        }
      />
    </div>
  );
}
