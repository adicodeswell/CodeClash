export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { price: [100, 80, 60, 70, 60, 75, 85] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { price: [10, 4, 5, 90, 120, 80] } });
  cases.push({ category: "basic", description: "Single", inputs: { price: [42] } });
  cases.push({ category: "basic", description: "Increasing", inputs: { price: [10, 20, 30, 40, 50] } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { price: [50, 40, 30, 20, 10] } });
  cases.push({ category: "basic", description: "Equal", inputs: { price: [5, 5, 5, 5] } });
  cases.push({ category: "basic", description: "Valley", inputs: { price: [100, 50, 20, 50, 100] } });
  cases.push({ category: "basic", description: "Peak", inputs: { price: [20, 50, 100, 50, 20] } });
  cases.push({ category: "basic", description: "Zigzag", inputs: { price: [30, 10, 40, 20, 50] } });
  cases.push({ category: "basic", description: "Step up", inputs: { price: [10, 10, 20, 20, 30] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { price: Array.from({ length: i + 2 }, (_, idx) => (idx + 1) * 5) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { price: Array(i + 3).fill(250) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const price = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { price } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    const price = Array.from({ length: len }, (_, idx) => (idx * 23) % 1000 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { price } });
  }

  return cases;
}