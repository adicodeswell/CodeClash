import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = "ABCDEF";

function randomGrid(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(letters[randomInt(rng, 0, letters.length - 1)]);
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
      board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
      word: "ABCCED"
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
      word: "SEE"
    }
  });

  cases.push({
    category: "basic",
    description: "Example 3",
    inputs: {
      board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
      word: "ABCB"
    }
  });

  for (let i = 3; i < 10; i++) {
    const grid = randomGrid(rng, 3, 3);
    const word = grid[0][0] + grid[0][1] + grid[1][1];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { board: grid, word } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const grid = [["A"]];
    cases.push({ category: "edge", description: "1x1 grid " + i, inputs: { board: grid, word: i % 2 === 0 ? "A" : "B" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const grid = [["A", "A"], ["A", "A"]];
    cases.push({ category: "corner", description: "All A's " + i, inputs: { board: grid, word: "AAA" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const grid = randomGrid(rng, 4, 4);
    const word = grid[1][1] + grid[1][2] + grid[2][2];
    cases.push({ category: "random", description: "Random " + i, inputs: { board: grid, word: rng() > 0.3 ? word : "ZZZ" } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const grid = randomGrid(rng, 5, 5);
    const word = grid[0][0] + grid[1][0] + grid[2][0] + grid[2][1];
    cases.push({ category: "large", description: "Large " + i, inputs: { board: grid, word: rng() > 0.3 ? word : "XYZW" } });
  }

  return cases;
}
