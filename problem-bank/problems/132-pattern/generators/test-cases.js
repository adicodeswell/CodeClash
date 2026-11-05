export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 1, 4, 2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [-1, 3, 2, 0] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { nums: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "All equal", inputs: { nums: [2, 2, 2, 2] } });
  cases.push({ category: "basic", description: "Exact 132", inputs: { nums: [1, 3, 2] } });
  cases.push({ category: "basic", description: "Long false", inputs: { nums: [10, 20, 30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "Valley then 132", inputs: { nums: [5, 1, 4, 2] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const hasPattern = i % 2 === 0;
    const nums = hasPattern ? [1, 4, 2, ...(Array(i).fill(0))] : Array.from({ length: i + 3 }, (_, idx) => idx);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums = Array(i + 4).fill(100);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 4;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 100;
    const nums = Array.from({ length: len }, (_, idx) => idx);
    nums[len - 2] = len + 10;
    nums[len - 1] = len + 5;
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}