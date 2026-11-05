export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "1x1", inputs: { matrix: [[1]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "3x3", inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } });
  cases.push({ category: "basic", description: "4x4", inputs: { matrix: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]] } });
  for (let i = 4; i < 10; i++) {
    const n = 2 + (i % 3);
    const mat = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => r * n + c + 1));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { matrix: mat } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const val = (i % 2 === 0) ? -1000 : 1000;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { matrix: [[val + i]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const n = 3;
    const mat = Array.from({ length: n }, () => Array.from({ length: n }, () => (i % 2 === 0 ? 0 : 1)));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { matrix: mat } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = 3 + (i % 5);
    const mat = Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 200) - 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 15 + (i - 65);
    const mat = Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 2000) - 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix: mat } });
  }

  return cases;
}
