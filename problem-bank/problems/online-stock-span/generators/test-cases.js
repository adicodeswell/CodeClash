export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { prices: [100, 80, 60, 70, 60, 75, 85] } });
  cases.push({ category: "basic", description: "Single day", inputs: { prices: [50] } });
  cases.push({ category: "basic", description: "Monotonically increasing", inputs: { prices: [10, 20, 30, 40, 50] } });
  cases.push({ category: "basic", description: "Monotonically decreasing", inputs: { prices: [50, 40, 30, 20, 10] } });
  cases.push({ category: "basic", description: "All identical", inputs: { prices: [30, 30, 30, 30] } });
  cases.push({ category: "basic", description: "Valley shape", inputs: { prices: [50, 30, 10, 30, 60] } });
  cases.push({ category: "basic", description: "Peak shape", inputs: { prices: [10, 30, 50, 30, 10] } });
  cases.push({ category: "basic", description: "Alternate", inputs: { prices: [10, 20, 10, 20, 10] } });
  cases.push({ category: "basic", description: "Two prices", inputs: { prices: [100, 200] } });
  cases.push({ category: "basic", description: "Two prices drop", inputs: { prices: [200, 100] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const prices = Array.from({ length: i + 2 }, (_, idx) => (idx + 1) * 10);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { prices } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const prices = Array(i + 3).fill(100);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { prices } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const prices = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { prices } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const prices = Array.from({ length: len }, (_, idx) => (idx * 17) % 500 + 10);
    cases.push({ category: "large", description: "Large " + i, inputs: { prices } });
  }

  return cases;
}