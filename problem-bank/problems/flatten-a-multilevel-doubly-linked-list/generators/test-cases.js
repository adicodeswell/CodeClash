export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nodes: [[1, 1, -1], [2, 2, -1], [3, 3, 4], [4, -1, -1], [7, 5, -1], [8, -1, -1]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nodes: [[1, -1, 1], [2, -1, 2], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Single node", inputs: { nodes: [[10, -1, -1]] } });
  cases.push({ category: "basic", description: "Linear list", inputs: { nodes: [[1, 1, -1], [2, 2, -1], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Child on head", inputs: { nodes: [[1, 2, 1], [2, -1, -1], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Child on tail", inputs: { nodes: [[1, 1, -1], [2, -1, 2], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Branching tree", inputs: { nodes: [[1, -1, 1], [2, 3, 2], [3, -1, -1], [4, -1, -1]] } });
  cases.push({ category: "basic", description: "Deep single spine", inputs: { nodes: [[1, -1, 1], [2, -1, 2], [3, -1, 3], [4, -1, -1]] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { nodes: [[-1, 1, -1], [-2, -1, 2], [-3, -1, -1]] } });
  cases.push({ category: "basic", description: "Five nodes mixed", inputs: { nodes: [[1, 1, -1], [2, -1, 2], [3, 3, -1], [4, 4, -1], [5, -1, -1]] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const nodes = Array.from({ length: len }, (_, idx) => [idx + 1, idx + 1 < len ? idx + 1 : -1, -1]);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nodes } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const nodes = Array.from({ length: len }, (_, idx) => [(idx + 1) * 10, -1, idx + 1 < len ? idx + 1 : -1]);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nodes } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const nodes = [
      [1, 1, 3],
      [2, 2, -1],
      [3, -1, -1],
      [4, 4, -1],
      [5, -1, -1]
    ];
    nodes[0][0] = (i + 1) * 3;
    cases.push({ category: "random", description: "Random " + i, inputs: { nodes } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 100 + i * 10;
    const nodes = Array.from({ length: len }, (_, idx) => [idx, idx + 1 < len ? idx + 1 : -1, -1]);
    cases.push({ category: "large", description: "Large " + i, inputs: { nodes } });
  }

  return cases;
}