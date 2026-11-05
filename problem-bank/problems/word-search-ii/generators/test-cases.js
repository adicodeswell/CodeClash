import { randomInt, pickRandom, shuffle } from "../../../scripts/utils/prng.js";

const letters = "abcdefghijklmnopqrstuvwxyz";

function randomGrid(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) {
      row.push(letters[randomInt(rng, 0, letters.length - 1)]);
    }
    grid.push(row);
  }
  return grid;
}

// Extract a word of length len along a valid path on grid
function extractWord(rng, grid, len) {
  const m = grid.length;
  const n = grid[0].length;
  let r = randomInt(rng, 0, m - 1);
  let c = randomInt(rng, 0, n - 1);
  let word = grid[r][c];
  const visited = new Set([`${r},${c}`]);

  for (let step = 1; step < len; step++) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const validDirs = dirs.filter(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      return nr >= 0 && nr < m && nc >= 0 && nc < n && !visited.has(`${nr},${nc}`);
    });
    if (validDirs.length === 0) break;
    const [dr, dc] = pickRandom(rng, validDirs);
    r += dr;
    c += dc;
    visited.add(`${r},${c}`);
    word += grid[r][c];
  }
  return word;
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      board: [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"]
      ],
      words: ["oath", "pea", "eat", "rain"]
    }
  });

  cases.push({
    category: "basic",
    description: "Small 2x2 board",
    inputs: {
      board: [["a", "b"], ["c", "d"]],
      words: ["ab", "cd", "ac", "bd"]
    }
  });

  for (let i = 2; i < 10; i++) {
    const grid = randomGrid(rng, 3, 3);
    const guaranteed = extractWord(rng, grid, 3);
    const words = [guaranteed, "xyz", "qrs"];
    cases.push({
      category: "basic",
      description: "Basic grid " + i,
      inputs: { board: grid, words }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const m = 2 + (i % 3);
    const n = 2 + ((i + 1) % 3);
    const grid = randomGrid(rng, m, n);
    const guaranteed1 = extractWord(rng, grid, 2);
    const guaranteed2 = extractWord(rng, grid, 3);
    const words = Array.from(new Set([guaranteed1, guaranteed2, "no", "yes"]));
    cases.push({
      category: "edge",
      description: "Edge grid " + i,
      inputs: { board: grid, words }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const grid = [["a", "a"], ["a", "a"]];
    cases.push({
      category: "corner",
      description: "Corner identical cells " + i,
      inputs: { board: grid, words: ["a", "aa", "aaa", "aaaa", "b"] }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 4;
    const n = 4;
    const grid = randomGrid(rng, m, n);
    const wList = new Set();
    wList.add(extractWord(rng, grid, randomInt(rng, 2, 4)));
    wList.add(extractWord(rng, grid, randomInt(rng, 2, 4)));
    wList.add("notfound");
    cases.push({
      category: "random",
      description: "Random grid " + i,
      inputs: { board: grid, words: Array.from(wList) }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 5;
    const n = 5;
    const grid = randomGrid(rng, m, n);
    const wList = new Set();
    for (let k = 0; k < 4; k++) {
      wList.add(extractWord(rng, grid, randomInt(rng, 3, 5)));
    }
    wList.add("miss1");
    wList.add("miss2");
    cases.push({
      category: "large",
      description: "Large 5x5 grid " + i,
      inputs: { board: grid, words: Array.from(wList) }
    });
  }

  return cases;
}
