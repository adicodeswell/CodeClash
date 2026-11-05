export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [4, 2, 1, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [-1, 5, 3, 4, 0] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Two inverted", inputs: { head: [2, 1] } });
  cases.push({ category: "basic", description: "Already sorted", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Reversed", inputs: { head: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Pi digits", inputs: { head: [3, 1, 4, 1, 5, 9, 2, 6] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { head: [10, -10, 20, -20] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0, 0] } });
  cases.push({ category: "basic", description: "Four elements", inputs: { head: [100, 50, 75, 25] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: i + 2 }, (_, idx) => (i + 2) - idx) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(20 + i).fill(i * 10 - 50) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 5;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 20000) - 10000) } });
  }

  return cases;
}