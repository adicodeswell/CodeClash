export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 4, 3, 2, 5, 2], x: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [2, 1], x: 2 } });
  cases.push({ category: "basic", description: "Single node x=0", inputs: { head: [1], x: 0 } });
  cases.push({ category: "basic", description: "Single node x=2", inputs: { head: [1], x: 2 } });
  cases.push({ category: "basic", description: "All less", inputs: { head: [1, 2, 3, 4], x: 5 } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [5, 4, 3, 2, 1], x: 3 } });
  cases.push({ category: "basic", description: "All equal x", inputs: { head: [3, 3, 3], x: 3 } });
  cases.push({ category: "basic", description: "Negatives and positives", inputs: { head: [10, -5, 20, -10], x: 0 } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [1, 5, 2, 4, 3], x: 3 } });
  cases.push({ category: "basic", description: "Mixed", inputs: { head: [8, 1, 2, 9, 3], x: 5 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 2 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, x: i % 2 === 0 ? 0 : 50 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array(i + 3).fill(i * 5);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, x: i * 5 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 3;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const x = Math.floor(Math.random() * 200) - 100;
    cases.push({ category: "random", description: "Random " + i, inputs: { head, x } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 150 + i * 3;
    const head = Array.from({ length: len }, (_, idx) => (idx * 7) % 200 - 100);
    cases.push({ category: "large", description: "Large " + i, inputs: { head, x: 10 } });
  }

  return cases;
}