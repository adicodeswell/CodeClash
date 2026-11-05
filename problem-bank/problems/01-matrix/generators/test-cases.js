import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { mat: [[0,0,0],[0,1,0],[0,0,0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { mat: [[0,0,0],[0,1,0],[1,1,1]] } });
  cases.push({ category: "basic", description: "1x1 zero", inputs: { mat: [[0]] } });
  cases.push({ category: "basic", description: "2x2 all zeros", inputs: { mat: [[0,0],[0,0]] } });
  cases.push({ category: "basic", description: "Single zero in corner", inputs: { mat: [[0,1],[1,1]] } });
  cases.push({ category: "basic", description: "Single zero at bottom right", inputs: { mat: [[1,1],[1,0]] } });
  cases.push({ category: "basic", description: "1D row matrix", inputs: { mat: [[1,1,0,1,1,1]] } });
  cases.push({ category: "basic", description: "1D col matrix", inputs: { mat: [[1],[0],[1],[1]] } });
  cases.push({ category: "basic", description: "Diagonal zeros", inputs: { mat: [[0,1,1],[1,0,1],[1,1,0]] } });
  cases.push({ category: "basic", description: "Frame of zeros", inputs: { mat: [[0,0,0],[0,1,0],[0,0,0]] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const m = (i % 3) + 2;
    const n = (i % 4) + 2;
    const grid = Array.from({ length: m }, () => Array(n).fill(1));
    grid[0][0] = 0; // ensure at least one zero
    if (i % 2 === 0) grid[m - 1][n - 1] = 0;
    cases.push({ category: "edge", description: `Edge grid ${m}x${n}`, inputs: { mat: grid } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const m = 6;
    const n = 6;
    const grid = Array.from({ length: m }, (_, r) =>
      Array.from({ length: n }, (_, c) => ((r === 0 || c === 0 || r === m - 1 || c === n - 1) ? 0 : 1))
    );
    cases.push({ category: "boundary", description: `Boundary concentric box ${m}x${n}`, inputs: { mat: grid } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const m = randomInt(rng, 5, 12);
    const n = randomInt(rng, 5, 12);
    const grid = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => (randomInt(rng, 0, 4) === 0 ? 0 : 1))
    );
    grid[randomInt(rng, 0, m - 1)][randomInt(rng, 0, n - 1)] = 0; // guarantee at least one zero
    cases.push({ category: "random", description: `Random grid ${m}x${n}`, inputs: { mat: grid } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const m = 30;
    const n = 30;
    const grid = Array.from({ length: m }, () => Array(n).fill(1));
    grid[randomInt(rng, 0, m - 1)][randomInt(rng, 0, n - 1)] = 0;
    cases.push({ category: "stress", description: `Stress grid 30x30 single zero`, inputs: { mat: grid } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    const m = 25;
    const n = 25;
    const grid = Array.from({ length: m }, (_, r) =>
      Array.from({ length: n }, (_, c) => (r === 0 && c === 0 ? 0 : 1))
    );
    cases.push({ category: "adversarial", description: `Adversarial corner zero distance propagation ${m}x${n}`, inputs: { mat: grid } });
  }

  return cases;
}
