/**
 * Maps CodeClash supported language names to Judge0 language IDs.
 *
 * Judge0 CE language IDs:
 * - C++ (GCC 9.2.0): 54
 * - Java (OpenJDK 17): 91
 * - Python (3.11.2): 92
 * - JavaScript (Node.js 18.15.0): 93
 */
export const LANGUAGE_MAP = {
  cpp: 54,
  java: 91,
  python: 92,
  javascript: 93,
};

export function getJudge0LanguageId(language) {
  const envKey = `JUDGE0_${language?.toUpperCase()}_ID`;
  if (process.env[envKey]) {
    return Number(process.env[envKey]);
  }
  const id = LANGUAGE_MAP[language?.toLowerCase()];
  if (!id) {
    throw new Error(`Unsupported execution language: "${language}"`);
  }
  return id;
}
