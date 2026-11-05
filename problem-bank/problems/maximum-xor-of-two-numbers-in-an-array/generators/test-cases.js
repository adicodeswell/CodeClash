export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 10, 5, 25, 2, 8] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "All identical", inputs: { nums: [7, 7, 7] } });
  cases.push({ category: "basic", description: "Powers of two", inputs: { nums: [1, 2, 4, 8, 16] } });
  cases.push({ category: "basic", description: "Zero included", inputs: { nums: [0, 5, 10] } });
  cases.push({ category: "basic", description: "Complement pair", inputs: { nums: [15, 0] } });
  cases.push({ category: "basic", description: "Small consecutive", inputs: { nums: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Multiples of 10", inputs: { nums: [10, 20, 30, 40] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const nums = Array.from({ length: i + 2 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums = Array(i + 3).fill((i + 1) * 11);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 20;
    const nums = Array.from({ length: len }, (_, idx) => (idx * 37) % 5000);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}