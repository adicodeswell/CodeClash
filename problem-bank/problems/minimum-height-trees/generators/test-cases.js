import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

function makeRandomTreeEdges(rng, n) {
  const edges = [];
  for (let i = 1; i < n; i++) {
    const parent = randomInt(rng, 0, i - 1);
    edges.push([parent, i]);
  }
  return edges;
}

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 4, edges: [[1,0],[1,2],[1,3]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 6, edges: [[3,0],[3,1],[3,2],[3,4],[5,4]] } });
  cases.push({ category: "basic", description: "n=1 single node", inputs: { n: 1, edges: [] } });
  cases.push({ category: "basic", description: "n=2 two nodes", inputs: { n: 2, edges: [[0,1]] } });
  cases.push({ category: "basic", description: "n=3 line graph", inputs: { n: 3, edges: [[0,1],[1,2]] } });
  cases.push({ category: "basic", description: "n=4 star graph", inputs: { n: 4, edges: [[0,1],[0,2],[0,3]] } });
  cases.push({ category: "basic", description: "n=4 line graph (2 centroids)", inputs: { n: 4, edges: [[0,1],[1,2],[2,3]] } });
  cases.push({ category: "basic", description: "n=5 balanced tree", inputs: { n: 5, edges: [[0,1],[0,2],[1,3],[2,4]] } });
  cases.push({ category: "basic", description: "n=5 line graph (1 centroid)", inputs: { n: 5, edges: [[0,1],[1,2],[2,3],[3,4]] } });
  cases.push({ category: "basic", description: "n=7 balanced binary tree", inputs: { n: 7, edges: [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const n = i - 7;
    // Star graph with node 0 at center
    const edges = [];
    for (let j = 1; j < n; j++) edges.push([0, j]);
    cases.push({ category: "edge", description: `Star graph n=${n}`, inputs: { n, edges } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const n = i - 15;
    // Line graph 0-1-2-...-(n-1)
    const edges = [];
    for (let j = 0; j < n - 1; j++) edges.push([j, j + 1]);
    cases.push({ category: "boundary", description: `Line graph n=${n}`, inputs: { n, edges } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const n = randomInt(rng, 10, 30);
    const edges = makeRandomTreeEdges(rng, n);
    cases.push({ category: "random", description: `Random tree n=${n}`, inputs: { n, edges } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const n = 150;
    const edges = makeRandomTreeEdges(rng, n);
    cases.push({ category: "stress", description: `Stress tree n=${n}`, inputs: { n, edges } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    // Two large stars joined by a bridge of length 2
    const n = 80;
    const edges = [[0, 1]]; // bridge
    for (let j = 2; j < 40; j++) edges.push([0, j]);
    for (let j = 40; j < n; j++) edges.push([1, j]);
    cases.push({ category: "adversarial", description: `Dual hub barbell tree n=${n}`, inputs: { n, edges } });
  }

  return cases;
}
