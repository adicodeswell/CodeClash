import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1 from statement",
    inputs: { image: [[1,1,1],[1,1,0],[1,0,1]], sr: 1, sc: 1, color: 2 }
  });
  cases.push({
    category: "basic",
    description: "Example 2 from statement: color unchanged",
    inputs: { image: [[0,0,0],[0,0,0]], sr: 0, sc: 0, color: 0 }
  });
  cases.push({
    category: "basic",
    description: "1x1 single pixel change",
    inputs: { image: [[1]], sr: 0, sc: 0, color: 2 }
  });
  cases.push({
    category: "basic",
    description: "2x2 checkered pattern",
    inputs: { image: [[1, 2], [2, 1]], sr: 0, sc: 0, color: 3 }
  });
  cases.push({
    category: "basic",
    description: "Entire 3x3 filled",
    inputs: { image: [[1,1,1],[1,1,1],[1,1,1]], sr: 0, sc: 0, color: 5 }
  });
  cases.push({
    category: "basic",
    description: "Corner fill",
    inputs: { image: [[4,1],[1,1]], sr: 0, sc: 0, color: 9 }
  });
  cases.push({
    category: "basic",
    description: "Border fill leaving center",
    inputs: { image: [[2,2,2],[2,1,2],[2,2,2]], sr: 0, sc: 0, color: 7 }
  });
  cases.push({
    category: "basic",
    description: "Center fill in surrounded ring",
    inputs: { image: [[2,2,2],[2,1,2],[2,2,2]], sr: 1, sc: 1, color: 7 }
  });
  cases.push({
    category: "basic",
    description: "Diagonal disconnect",
    inputs: { image: [[1,0,1],[0,1,0],[1,0,1]], sr: 1, sc: 1, color: 4 }
  });
  cases.push({
    category: "basic",
    description: "1D horizontal strip",
    inputs: { image: [[1,1,1,2,1,1]], sr: 0, sc: 1, color: 3 }
  });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const m = (i % 3) + 1;
    const n = (i % 4) + 1;
    const grid = Array.from({ length: m }, () => Array.from({ length: n }, () => (i % 2 === 0 ? 0 : 1)));
    cases.push({
      category: "edge",
      description: `Edge grid ${m}x${n}`,
      inputs: {
        image: grid,
        sr: randomInt(rng, 0, m - 1),
        sc: randomInt(rng, 0, n - 1),
        color: randomInt(rng, 2, 10)
      }
    });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const m = 5;
    const n = 5;
    const grid = Array.from({ length: m }, (_, r) =>
      Array.from({ length: n }, (_, c) => ((r + c) % 2 === 0 ? 3 : 4))
    );
    cases.push({
      category: "boundary",
      description: `Boundary alternating ${m}x${n}`,
      inputs: {
        image: grid,
        sr: i % m,
        sc: (i * 2) % n,
        color: (i % 5) + 5
      }
    });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const m = randomInt(rng, 4, 10);
    const n = randomInt(rng, 4, 10);
    const grid = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => randomInt(rng, 0, 3))
    );
    cases.push({
      category: "random",
      description: `Random grid ${m}x${n}`,
      inputs: {
        image: grid,
        sr: randomInt(rng, 0, m - 1),
        sc: randomInt(rng, 0, n - 1),
        color: randomInt(rng, 0, 5)
      }
    });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const m = 30;
    const n = 30;
    const grid = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => (i % 3 === 0 ? 1 : randomInt(rng, 0, 1)))
    );
    cases.push({
      category: "stress",
      description: `Stress grid ${m}x${n}`,
      inputs: {
        image: grid,
        sr: randomInt(rng, 0, m - 1),
        sc: randomInt(rng, 0, n - 1),
        color: randomInt(rng, 10, 50)
      }
    });
  }

  // Adversarial (70 - 79): Snake / spiral labyrinth
  for (let i = 70; i < 80; i++) {
    const m = 20;
    const n = 20;
    const grid = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
    // Draw a long connected snake
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (r % 2 === 0) grid[r][c] = 1;
        else if (r % 4 === 1 && c === n - 1) grid[r][c] = 1;
        else if (r % 4 === 3 && c === 0) grid[r][c] = 1;
      }
    }
    cases.push({
      category: "adversarial",
      description: `Labyrinth snake grid ${m}x${n}`,
      inputs: { image: grid, sr: 0, sc: 0, color: 8 }
    });
  }

  return cases;
}
