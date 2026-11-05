import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 5, edges: [[0, 1], [0, 2], [0, 3], [1, 4]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]] } });
  cases.push({ category: "basic", description: "Single node", inputs: { n: 1, edges: [] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic line " + i, inputs: { n: 3, edges: [[0, 1], [1, 2]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Disconnected " + i, inputs: { n: 4, edges: [[0, 1], [2, 3]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Cycle of 3 " + i, inputs: { n: 3, edges: [[0, 1], [1, 2], [2, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 10);
    const edges = [];
    for (let u = 1; u < n; u++) {
      edges.push([randomInt(rng, 0, u - 1), u]);
    }
    cases.push({ category: "random", description: "Random tree " + i, inputs: { n, edges } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 10, 20);
    const edges = [];
    for (let u = 1; u < n; u++) {
      edges.push([randomInt(rng, 0, u - 1), u]);
    }
    cases.push({ category: "large", description: "Large tree " + i, inputs: { n, edges } });
  }

  return cases;
}
