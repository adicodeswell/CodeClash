export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abciiidef", k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aeiou", k: 2 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "leetcode", k: 3 } });
  cases.push({ category: "basic", description: "No vowels", inputs: { s: "xyz", k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abcdefghij", k: i - 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All vowels " + i, inputs: { s: "a".repeat(len), k: Math.floor(len / 2) || 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "No vowels " + i, inputs: { s: "b".repeat(len), k: Math.floor(len / 2) || 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 3 + (i % 5) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 50;
    const chars = "aeioubcdfghjklmnpqrstvwxyz";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 10 + (i % 20) } });
  }
  return cases;
}
