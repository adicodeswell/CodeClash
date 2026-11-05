import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

function makePermGrid(rng, n) {
  const nums = Array.from({ length: n * n }, (_, i) => i);
  shuffle(rng, nums);
  const grid = [];
  for (let r = 0; r < n; r++) {
    grid.push(nums.slice(r * n, (r + 1) * n));
  }
  return grid;
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { grid: [[0, 2], [1, 3]] } });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      grid: [
        [0, 1, 2, 3, 4],
        [24, 23, 22, 21, 5],
        [12, 13, 14, 15, 16],
        [11, 17, 18, 19, 20],
        [10, 9, 8, 7, 6]
      ]
    }
  });

  cases.push({ category: "basic", description: "1x1 grid", inputs: { grid: [[0]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic 2x2 " + i, inputs: { grid: makePermGrid(rng, 2) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge 1x1 " + i, inputs: { grid: [[0]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner 3x3 " + i, inputs: { grid: makePermGrid(rng, 3) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 4x4 " + i, inputs: { grid: makePermGrid(rng, 4) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 6x6 " + i, inputs: { grid: makePermGrid(rng, 6) } });
  }

  return cases;
}
