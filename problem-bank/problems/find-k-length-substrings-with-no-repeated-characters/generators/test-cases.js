export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "havefunonleetcode", k: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "home", k: 5 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { s: "abc", k: 1 } });
  cases.push({ category: "basic", description: "All same", inputs: { s: "aaaa", k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abcdefghijkl", k: i - 1 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k > 26 " + i, inputs: { s: "abcdefghijklmnopqrstuvwxyz", k: 27 + (i % 5) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Exact alphabet " + i, inputs: { s: "abcdefghijklmnopqrstuvwxyz".slice(0, len), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 20 + (i % 25);
    const chars = "abcdefghijkl";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 3 + (i % 4) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 50;
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 5 + (i % 10) } });
  }
  return cases;
}
