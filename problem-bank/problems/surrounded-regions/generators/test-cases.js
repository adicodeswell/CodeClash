import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

function randomBoard(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(rng() < 0.4 ? "O" : "X");
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
      board: [
        ["X","X","X","X"],
        ["X","O","O","X"],
        ["X","X","O","X"],
        ["X","O","X","X"]
      ]
    }
  });

  cases.push({ category: "basic", description: "Example 2", inputs: { board: [["X"]] } });
  cases.push({ category: "basic", description: "All X", inputs: { board: [["X","X"], ["X","X"]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { board: randomBoard(rng, 4, 4) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single cell " + i, inputs: { board: [[i % 2 === 0 ? "X" : "O"]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Surrounded center " + i, inputs: { board: [["X","X","X"], ["X","O","X"], ["X","X","X"]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 8x8 " + i, inputs: { board: randomBoard(rng, 8, 8) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 15x15 " + i, inputs: { board: randomBoard(rng, 15, 15) } });
  }

  return cases;
}
