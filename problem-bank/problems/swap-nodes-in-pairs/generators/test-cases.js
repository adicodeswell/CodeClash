export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Odd length 3", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Six elements", inputs: { head: [10, 20, 30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "Five elements", inputs: { head: [7, 8, 9, 10, 11] } });
  cases.push({ category: "basic", description: "Descending 2", inputs: { head: [2, 1] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0, 0, 0] } });
  cases.push({ category: "basic", description: "Three distinct", inputs: { head: [5, 10, 15] } });
  cases.push({ category: "basic", description: "Nine elements", inputs: { head: [9, 8, 7, 6, 5, 4, 3, 2, 1] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: i + 1 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(i + 2).fill(42) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 2;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 100)) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 80 + i;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx * 3) } });
  }

  return cases;
}