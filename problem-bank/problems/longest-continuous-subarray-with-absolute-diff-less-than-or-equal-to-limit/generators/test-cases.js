export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [8, 2, 4, 7], limit: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [10, 1, 2, 4, 7, 2], limit: 5 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [4, 2, 2, 2, 4, 4, 2, 2], limit: 0 } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [10], limit: 0 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 6, 7, 9], limit: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "limit = 0 " + i, inputs: { nums: Array.from({ length: len }, () => 5), limit: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Large limit " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), limit: 100 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, limit: 5 + (i % 5) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, limit: 10 } });
  }
  return cases;
}
