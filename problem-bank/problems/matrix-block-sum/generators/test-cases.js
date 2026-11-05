export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { mat: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], k: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { mat: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], k: 2 } });
  cases.push({ category: "basic", description: "Single", inputs: { mat: [[5]], k: 1 } });
  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { mat: [[1, 2], [3, 4]], k: 1 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Large k " + i, inputs: { mat: [[2, 2], [2, 2]], k: 5 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Row vector " + i, inputs: { mat: [Array.from({ length: len }, (_, idx) => idx + 1)], k: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const m = 3 + (i % 4), n = 3 + ((i * 2) % 4);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 20) + 1));
    cases.push({ category: "random", description: "Random " + i, inputs: { mat, k: 1 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const m = 12 + (i % 5), n = 12 + (i % 5);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 50) + 1));
    cases.push({ category: "large", description: "Large " + i, inputs: { mat, k: 3 } });
  }
  return cases;
}
