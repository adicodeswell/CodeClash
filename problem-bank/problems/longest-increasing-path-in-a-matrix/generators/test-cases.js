import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: { matrix: [[9, 9, 4], [6, 6, 8], [2, 1, 1]] }
  });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: { matrix: [[3, 4, 5], [3, 2, 6], [2, 2, 1]] }
  });
  cases.push({ category: "basic", description: "Single cell", inputs: { matrix: [[1]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { matrix: [[1, 2], [3, 4]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "1xN row " + i, inputs: { matrix: [[1, 2, 3, 4]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All equal " + i, inputs: { matrix: [[5, 5], [5, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 4, n = 4;
    const mat = [];
    for (let r = 0; r < m; r++) {
      const row = [];
      for (let c = 0; c < n; c++) row.push(randomInt(rng, 1, 20));
      mat.push(row);
    }
    cases.push({ category: "random", description: "Random 4x4 " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 8, n = 8;
    const mat = [];
    for (let r = 0; r < m; r++) {
      const row = [];
      for (let c = 0; c < n; c++) row.push(randomInt(rng, 1, 100));
      mat.push(row);
    }
    cases.push({ category: "large", description: "Large 8x8 " + i, inputs: { matrix: mat } });
  }

  return cases;
}
