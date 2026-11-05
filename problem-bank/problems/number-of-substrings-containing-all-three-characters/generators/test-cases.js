export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abcabc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aaacb" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "abc" } });
  cases.push({ category: "basic", description: "cba", inputs: { s: "cba" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "ab".repeat(i) + "c" } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "No c " + i, inputs: { s: "ab".repeat(i) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Single match at end " + i, inputs: { s: "a".repeat(len) + "b" + "c" } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }
  return cases;
}
