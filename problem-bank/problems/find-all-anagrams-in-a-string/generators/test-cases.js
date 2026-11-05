export function generateCases({ rng }) {
  const cases = [];
  // Ensure every case has at least 1 match so output is not empty
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "cbaebabacd", p: "abc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "abab", p: "ab" } });
  cases.push({ category: "basic", description: "Exact match", inputs: { s: "xyz", p: "xyz" } });
  cases.push({ category: "basic", description: "Repeated chars", inputs: { s: "aaaaa", p: "aa" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "ab".repeat(i), p: "ab" } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s: "c".repeat(len), p: "c" } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s: "abcba" + "a".repeat(i - 25), p: "ab" } });
  }
  for (let i = 40; i < 65; i++) {
    const p = "abc";
    const prefix = "xyz".repeat((i % 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: prefix + "bca" + prefix + "cab", p } });
  }
  for (let i = 65; i < 80; i++) {
    const p = "abcd";
    const middle = "bcda";
    cases.push({ category: "large", description: "Large " + i, inputs: { s: "x".repeat(i) + middle + "x".repeat(i) + "dabc", p } });
  }
  return cases;
}
