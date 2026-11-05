import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { edges: [[1, 2], [1, 3], [2, 3]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { edges: [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]] } });

  for (let i = 2; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { edges: [[1, 2], [2, 3], [3, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Small 4-cycle " + i, inputs: { edges: [[1, 2], [2, 3], [3, 4], [1, 4]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Triangle at end " + i, inputs: { edges: [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 5, 10);
    // Tree of size n
    const tree = [];
    for (let u = 2; u <= n; u++) {
      tree.push([randomInt(rng, 1, u - 1), u]);
    }
    // Add redundant edge
    tree.push([1, n]);
    cases.push({ category: "random", description: "Random tree+cycle " + i, inputs: { edges: tree } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 15, 30);
    const tree = [];
    for (let u = 2; u <= n; u++) {
      tree.push([randomInt(rng, 1, u - 1), u]);
    }
    tree.push([1, n]);
    cases.push({ category: "large", description: "Large tree+cycle " + i, inputs: { edges: tree } });
  }

  return cases;
}
