export function generateCases({ rng }) {
  const cases = [];
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      matrix: [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5]
      ],
      queries: [[2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
    }
  });
  cases.push({ category: "basic", description: "Single cell", inputs: { matrix: [[5]], queries: [[0, 0, 0, 0]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 2], [3, 4]], queries: [[0, 0, 1, 1], [0, 1, 1, 1]] } });
  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], queries: [[0, 0, 1, 1], [1, 1, 2, 2]] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "All 1s " + i, inputs: { matrix: [[1, 1], [1, 1]], queries: [[0, 0, 1, 1]] } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Full matrix query " + i, inputs: { matrix: Array.from({ length: len }, (_, r) => Array.from({ length: len }, (_, c) => r + c)), queries: [[0, 0, len - 1, len - 1]] } });
  }
  for (let i = 40; i < 65; i++) {
    const m = 3 + (i % 4), n = 3 + ((i * 2) % 4);
    const matrix = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 20) - 10));
    const queries = [];
    for (let q = 0; q < 4; q++) {
      const r1 = Math.floor(Math.random() * m);
      const r2 = r1 + Math.floor(Math.random() * (m - r1));
      const c1 = Math.floor(Math.random() * n);
      const c2 = c1 + Math.floor(Math.random() * (n - c1));
      queries.push([r1, c1, r2, c2]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix, queries } });
  }
  for (let i = 65; i < 80; i++) {
    const m = 15 + (i % 5), n = 15 + (i % 5);
    const matrix = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 50) - 25));
    const queries = [];
    for (let q = 0; q < 8; q++) {
      const r1 = Math.floor(Math.random() * m);
      const r2 = r1 + Math.floor(Math.random() * (m - r1));
      const c1 = Math.floor(Math.random() * n);
      const c2 = c1 + Math.floor(Math.random() * (n - c1));
      queries.push([r1, c1, r2, c2]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix, queries } });
  }
  return cases;
}
