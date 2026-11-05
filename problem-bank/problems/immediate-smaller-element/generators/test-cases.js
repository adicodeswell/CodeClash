export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [4, 2, 1, 5, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [5, 6, 2, 3, 1, 7] } });
  cases.push({ category: "basic", description: "Single element", inputs: { arr: [10] } });
  cases.push({ category: "basic", description: "Two elements decreasing", inputs: { arr: [20, 10] } });
  cases.push({ category: "basic", description: "Two elements increasing", inputs: { arr: [10, 20] } });
  cases.push({ category: "basic", description: "All strictly decreasing", inputs: { arr: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "All strictly increasing", inputs: { arr: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "All equal", inputs: { arr: [4, 4, 4, 4] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { arr: [10, 5, 10, 5, 10] } });
  cases.push({ category: "basic", description: "Plateaus", inputs: { arr: [8, 8, 5, 5, 2] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { arr: Array.from({ length: i + 2 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { arr: Array(i + 3).fill(100) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    const arr = Array.from({ length: len }, (_, idx) => (idx * 31) % 1000 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr } });
  }

  return cases;
}