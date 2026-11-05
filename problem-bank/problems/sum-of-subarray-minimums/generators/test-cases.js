export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [3, 1, 2, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [11, 81, 94, 43, 3] } });
  cases.push({ category: "basic", description: "Single element", inputs: { arr: [7] } });
  cases.push({ category: "basic", description: "Two elements asc", inputs: { arr: [1, 2] } });
  cases.push({ category: "basic", description: "Two elements desc", inputs: { arr: [2, 1] } });
  cases.push({ category: "basic", description: "All equal", inputs: { arr: [5, 5, 5, 5] } });
  cases.push({ category: "basic", description: "Monotone increasing", inputs: { arr: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Monotone decreasing", inputs: { arr: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Peak shape", inputs: { arr: [1, 3, 5, 3, 1] } });
  cases.push({ category: "basic", description: "Valley shape", inputs: { arr: [5, 3, 1, 3, 5] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { arr: Array.from({ length: i + 2 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { arr: Array(i + 3).fill(42) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const arr = Array.from({ length: len }, (_, idx) => (idx * 17) % 500 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr } });
  }

  return cases;
}