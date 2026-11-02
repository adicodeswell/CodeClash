import { useState, useCallback } from "react";

function getStorageKey(slug, language) {
  return `codeclash_draft_${slug}_${language}`;
}

function getStoredDraft(slug, language, defaultCode) {
  if (!slug || !language) return defaultCode;
  try {
    const saved = localStorage.getItem(getStorageKey(slug, language));
    return saved !== null ? saved : defaultCode;
  } catch {
    return defaultCode;
  }
}

export function useProblemDraft(slug, language, defaultCode = "") {
  const [currentKey, setCurrentKey] = useState(() => `${slug}_${language}`);
  const [lastDefaultCode, setLastDefaultCode] = useState(defaultCode);
  const [code, setCode] = useState(() =>
    getStoredDraft(slug, language, defaultCode)
  );

  const key = `${slug}_${language}`;

  // If slug or language changed, adjust state during render (React-recommended pattern)
  if (key !== currentKey) {
    setCurrentKey(key);
    setLastDefaultCode(defaultCode);
    const saved = getStoredDraft(slug, language, defaultCode);
    setCode(saved);
  } else if (defaultCode !== lastDefaultCode && defaultCode) {
    // If defaultCode arrived asynchronously from the API and no draft was saved
    setLastDefaultCode(defaultCode);
    try {
      const saved = localStorage.getItem(getStorageKey(slug, language));
      if (saved === null) {
        setCode(defaultCode);
      }
    } catch {
      setCode(defaultCode);
    }
  }

  // Persist code on edit
  const updateCode = useCallback(
    (newCode) => {
      setCode(newCode);
      if (slug && language) {
        try {
          localStorage.setItem(getStorageKey(slug, language), newCode);
        } catch {
          // localStorage full or disabled
        }
      }
    },
    [slug, language]
  );

  // Reset to default starter template from backend
  const resetToStarter = useCallback(() => {
    setCode(defaultCode);
    if (slug && language) {
      try {
        localStorage.removeItem(getStorageKey(slug, language));
      } catch {
        // Ignored
      }
    }
  }, [slug, language, defaultCode]);

  return {
    code,
    setCode: updateCode,
    resetToStarter,
  };
}
