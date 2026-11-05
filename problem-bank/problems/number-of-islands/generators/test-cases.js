import { randomInt } from "../../../scripts/utils/prng.js";

function randomGrid(rng, m, n, p1 = 0.3) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(rng() < p1 ? "1" : "0");
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
      grid: [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
      ]
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      grid: [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
      ]
    }
  });

  cases.push({ category: "basic", description: "All water", inputs: { grid: [["0","0"], ["0","0"]] } });
  cases.push({ category: "basic", description: "All land", inputs: { grid: [["1","1"], ["1","1"]] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { grid: randomGrid(rng, 4, 4, 0.4) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "1xN grid " + i, inputs: { grid: randomGrid(rng, 1, 8, 0.5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single cell " + i, inputs: { grid: [[i % 2 === 0 ? "1" : "0"]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 10x10 " + i, inputs: { grid: randomGrid(rng, 10, 10, 0.3) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 20x20 " + i, inputs: { grid: randomGrid(rng, 20, 20, 0.35) } });
  }

  return cases;
}
