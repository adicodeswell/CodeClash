import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nodes: [[7, -1], [13, 0], [11, 4], [10, 2], [1, 0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nodes: [[1, 1], [2, 1]] } });
  cases.push({ category: "basic", description: "Single node self", inputs: { nodes: [[3, 0]] } });
  cases.push({ category: "basic", description: "Single node null", inputs: { nodes: [[3, -1]] } });
  cases.push({ category: "basic", description: "All null random", inputs: { nodes: [[1, -1], [2, -1], [3, -1]] } });
  cases.push({ category: "basic", description: "Circular random", inputs: { nodes: [[1, 1], [2, 0]] } });
  cases.push({ category: "basic", description: "All point to head", inputs: { nodes: [[1, 0], [2, 0], [3, 0]] } });
  cases.push({ category: "basic", description: "All point to tail", inputs: { nodes: [[1, 2], [2, 2], [3, 2]] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { nodes: [[-10, 1], [-20, 0]] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { nodes: [[0, -1], [0, 0]] } });

  function makeNodes(n) {
    const list = [];
    for (let i = 0; i < n; i++) {
      const val = randomInt(rng, -100, 100);
      const randIdx = randomInt(rng, -1, n - 1);
      list.push([val, randIdx]);
    }
    return list;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nodes: makeNodes(2 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nodes: makeNodes(10) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { nodes: makeNodes(randomInt(rng, 15, 30)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { nodes: makeNodes(randomInt(rng, 40, 80)) } });
  }

  return cases;
}
