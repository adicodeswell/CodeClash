export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]] } });
  cases.push({ category: "basic", description: "Single 0", inputs: { matrix: [[0]] } });
  cases.push({ category: "basic", description: "Single 1", inputs: { matrix: [[1]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 0], [1, 1]] } });
  cases.push({ category: "basic", description: "All 0", inputs: { matrix: [[0, 0], [0, 0]] } });
  cases.push({ category: "basic", description: "No zeroes", inputs: { matrix: [[1, 2, 3], [4, 5, 6]] } });
  cases.push({ category: "basic", description: "Center zero", inputs: { matrix: [[1, 2], [3, 0], [5, 6]] } });
  cases.push({ category: "basic", description: "Top-left zero", inputs: { matrix: [[0, 2], [3, 4], [5, 6]] } });
  cases.push({ category: "basic", description: "Bottom-right zero", inputs: { matrix: [[1, 2], [3, 4], [5, 0]] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const row = Array.from({ length: 4 }, (_, idx) => (idx === i % 4 ? 0 : idx + 1));
    cases.push({ category: "edge", description: "Single row/col " + i, inputs: { matrix: [row] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const m = 3;
    const n = 3;
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => 1));
    mat[i % m][(i * 2) % n] = 0;
    cases.push({ category: "corner", description: "One zero in 3x3 " + i, inputs: { matrix: mat } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 3 + (i % 4);
    const n = 3 + ((i * 2) % 4);
    const mat = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => (Math.random() < 0.25 ? 0 : Math.floor(Math.random() * 50) + 1))
    );
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 15 + (i % 6);
    const n = 15 + ((i * 2) % 6);
    const mat = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => (Math.random() < 0.08 ? 0 : Math.floor(Math.random() * 100) + 1))
    );
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix: mat } });
  }

  return cases;
}
