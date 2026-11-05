export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "aabaaaacaabc", k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "a", k: 1 } });
  cases.push({ category: "basic", description: "k = 0", inputs: { s: "abc", k: 0 } });
  cases.push({ category: "basic", description: "Exact k = 1", inputs: { s: "abc", k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abc".repeat(i), k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Impossible " + i, inputs: { s: "a".repeat(i), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Equal counts " + i, inputs: { s: "a".repeat(i - 20) + "b".repeat(i - 20) + "c".repeat(i - 20), k: 2 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 1 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 3 + (i % 5) } });
  }
  return cases;
}
