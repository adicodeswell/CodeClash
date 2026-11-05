export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "bcabc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "cbacdcbc" } });
  cases.push({ category: "basic", description: "Single", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "Already sorted", inputs: { s: "abc" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "cdadabcc" } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All same " + i, inputs: { s: "x".repeat(len) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Reverse sorted " + i, inputs: { s: "edcba".repeat(2) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abcdefg";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const chars = "abcdefghijklm";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }
  return cases;
}
