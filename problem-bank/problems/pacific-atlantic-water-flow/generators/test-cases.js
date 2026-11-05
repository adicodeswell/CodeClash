import { randomInt } from "../../../scripts/utils/prng.js";

function randomGrid(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(randomInt(rng, 1, 20));
    grid.push(row);
  }
  return grid;
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      heights: [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4]
      ]
    }
  });

  cases.push({ category: "basic", description: "Example 2 (1x1)", inputs: { heights: [[1]] } });
  cases.push({ category: "basic", description: "Flat 2x2", inputs: { heights: [[1, 1], [1, 1]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { heights: randomGrid(rng, 3, 3) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "1xN " + i, inputs: { heights: randomGrid(rng, 1, 5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner 2x2 " + i, inputs: { heights: randomGrid(rng, 2, 2) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 6x6 " + i, inputs: { heights: randomGrid(rng, 6, 6) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 12x12 " + i, inputs: { heights: randomGrid(rng, 12, 12) } });
  }

  return cases;
}
