import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 5, edges: [[0, 1], [1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] } });
  cases.push({ category: "basic", description: "No edges", inputs: { n: 4, edges: [] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { n: 3, edges: [[0, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single node " + i, inputs: { n: 1, edges: [] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Complete graph K3 " + i, inputs: { n: 3, edges: [[0, 1], [1, 2], [0, 2]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 5, 12);
    const edges = [];
    for (let j = 0; j < n - 2; j++) {
      edges.push([j, j + 1]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { n, edges } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 15, 30);
    const edges = [];
    for (let j = 0; j < n - 4; j++) {
      edges.push([j, j + 1]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { n, edges } });
  }

  return cases;
}
