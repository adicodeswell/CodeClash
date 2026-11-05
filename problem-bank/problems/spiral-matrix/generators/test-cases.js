export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "3x3", inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } });
  cases.push({ category: "basic", description: "3x4", inputs: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] } });
  cases.push({ category: "basic", description: "1x1", inputs: { matrix: [[1]] } });
  cases.push({ category: "basic", description: "1x2", inputs: { matrix: [[1, 2]] } });
  cases.push({ category: "basic", description: "2x1", inputs: { matrix: [[1], [2]] } });
  cases.push({ category: "basic", description: "1x3", inputs: { matrix: [[1, 2, 3]] } });
  cases.push({ category: "basic", description: "3x1", inputs: { matrix: [[1], [2], [3]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "2x3", inputs: { matrix: [[1, 2, 3], [4, 5, 6]] } });
  cases.push({ category: "basic", description: "3x2", inputs: { matrix: [[1, 2], [3, 4], [5, 6]] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = (i - 9);
    if (i % 2 === 0) {
      cases.push({ category: "edge", description: "Row vector " + i, inputs: { matrix: [Array.from({ length: len }, (_, k) => k + 1)] } });
    } else {
      cases.push({ category: "edge", description: "Col vector " + i, inputs: { matrix: Array.from({ length: len }, (_, k) => [k + 1]) } });
    }
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const m = 2 + (i % 3);
    const n = 2 + ((i * 2) % 3);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => i * 3));
    cases.push({ category: "corner", description: "Uniform values " + i, inputs: { matrix: mat } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 2 + (i % 5);
    const n = 2 + ((i * 2) % 5);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 200) - 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 12 + (i % 8);
    const n = 12 + ((i * 3) % 8);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 200) - 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix: mat } });
  }

  return cases;
}
