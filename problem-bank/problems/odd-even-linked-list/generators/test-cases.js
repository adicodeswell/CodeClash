export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [2, 1, 3, 5, 6, 4, 7] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Two nodes", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Three nodes", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Four nodes", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Six nodes", inputs: { head: [10, 20, 30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "All same", inputs: { head: [5, 5, 5] } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [9, 8, 7, 6, 5, 4] } });
  cases.push({ category: "basic", description: "Hundreds", inputs: { head: [100, 200, 300] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: i + 1 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(20 + i).fill(i * 10) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 3;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx) } });
  }

  return cases;
}