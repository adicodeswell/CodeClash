import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1 (4-cycle)", inputs: { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] } });
  cases.push({ category: "basic", description: "Two nodes connected", inputs: { adjList: [[2], [1]] } });
  cases.push({ category: "basic", description: "Triangle (3 nodes)", inputs: { adjList: [[2, 3], [1, 3], [1, 2]] } });

  for (let i = 3; i < 10; i++) {
    // Line graph of length 4
    cases.push({ category: "basic", description: "Line graph " + i, inputs: { adjList: [[2], [1, 3], [2, 4], [3]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Two node edge " + i, inputs: { adjList: [[2], [1]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    // Star graph (center = 1)
    const n = 4;
    const adj = [[2, 3, 4], [1], [1], [1]];
    cases.push({ category: "corner", description: "Star graph " + i, inputs: { adjList: adj } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 5, 10);
    // Build spanning tree
    const adj = Array.from({ length: n }, () => []);
    for (let u = 2; u <= n; u++) {
      const p = randomInt(rng, 1, u - 1);
      adj[u - 1].push(p);
      adj[p - 1].push(u);
    }
    cases.push({ category: "random", description: "Tree graph " + i, inputs: { adjList: adj } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 15, 25);
    const adj = Array.from({ length: n }, () => []);
    for (let u = 2; u <= n; u++) {
      const p = randomInt(rng, 1, u - 1);
      adj[u - 1].push(p);
      adj[p - 1].push(u);
    }
    cases.push({ category: "large", description: "Large tree " + i, inputs: { adjList: adj } });
  }

  return cases;
}
