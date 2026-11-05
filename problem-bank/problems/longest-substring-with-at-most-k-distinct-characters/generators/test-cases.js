export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "eceba", k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aa", k: 1 } });
  cases.push({ category: "basic", description: "k = 0", inputs: { s: "abc", k: 0 } });
  cases.push({ category: "basic", description: "k > unique", inputs: { s: "ab", k: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abacccbba", k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { s: "a".repeat(i - 8) + "b", k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All distinct " + i, inputs: { s: "abcdefgh", k: 3 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abcdef";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 2 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const chars = "abcdefghijkl";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 4 + (i % 5) } });
  }
  return cases;
}
