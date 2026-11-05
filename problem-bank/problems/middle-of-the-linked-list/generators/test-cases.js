export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2, 3, 4, 5, 6] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Two nodes", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Three nodes", inputs: { head: [10, 20, 30] } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Duplicates", inputs: { head: [1, 1, 1, 1] } });
  cases.push({ category: "basic", description: "Odd length", inputs: { head: [7, 8, 9, 10, 11, 12, 13] } });
  cases.push({ category: "basic", description: "Two large vals", inputs: { head: [100, 200] } });
  cases.push({ category: "basic", description: "Even length", inputs: { head: [1, 3, 5, 7, 9, 11] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const len = 10 + i * 2;
    const val = (i * 7) % 50 + 1;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(len).fill(val) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 80 + i;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => (idx * 3 + 1) % 100 + 1) } });
  }

  return cases;
}