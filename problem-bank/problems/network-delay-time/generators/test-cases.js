import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { times: [[1, 2, 1]], n: 2, k: 1 } });
  cases.push({ category: "basic", description: "Example 3 (unreachable)", inputs: { times: [[1, 2, 1]], n: 2, k: 2 } });

  for (let i = 3; i < 10; i++) {
    const times = [[1, 2, 2], [2, 3, 3], [1, 3, 6]];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { times, n: 3, k: 1 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single node " + i, inputs: { times: [], n: 1, k: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const times = [[1, 2, 10], [2, 3, 20], [3, 4, 30]];
    cases.push({ category: "corner", description: "Chain " + i, inputs: { times, n: 4, k: 1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 8);
    const times = [];
    for (let u = 1; u < n; u++) {
      times.push([u, u + 1, randomInt(rng, 1, 15)]);
    }
    cases.push({ category: "random", description: "Random tree " + i, inputs: { times, n, k: 1 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 10, 20);
    const times = [];
    for (let u = 1; u < n; u++) {
      times.push([u, u + 1, randomInt(rng, 1, 20)]);
      if (u > 1 && rng() > 0.5) times.push([1, u, randomInt(rng, 10, 50)]);
    }
    cases.push({ category: "large", description: "Large network " + i, inputs: { times, n, k: 1 } });
  }

  return cases;
}
