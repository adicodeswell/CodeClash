import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]] } });
  cases.push({ category: "basic", description: "No fresh oranges", inputs: { grid: [[0, 2]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { grid: [[2, 1], [1, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single orange " + i, inputs: { grid: [[i % 2 === 0 ? 2 : 1]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All empty " + i, inputs: { grid: [[0, 0], [0, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const grid = [
      [2, randomInt(rng, 0, 1), randomInt(rng, 0, 1)],
      [randomInt(rng, 0, 1), randomInt(rng, 0, 1), randomInt(rng, 0, 1)],
      [randomInt(rng, 0, 1), randomInt(rng, 0, 1), randomInt(rng, 0, 1)]
    ];
    cases.push({ category: "random", description: "Random 3x3 " + i, inputs: { grid } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 6, n = 6;
    const grid = [];
    for (let r = 0; r < m; r++) {
      const row = [];
      for (let c = 0; c < n; c++) {
        row.push(rng() < 0.2 ? 2 : (rng() < 0.7 ? 1 : 0));
      }
      grid.push(row);
    }
    cases.push({ category: "large", description: "Large 6x6 " + i, inputs: { grid } });
  }

  return cases;
}
