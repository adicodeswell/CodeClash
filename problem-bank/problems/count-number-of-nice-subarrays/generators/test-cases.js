export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 2, 1, 1], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [2, 4, 6], k: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [2, 2, 2, 1, 2, 2, 1, 2, 2, 2], k: 2 } });
  cases.push({ category: "basic", description: "Single odd", inputs: { nums: [1], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, 6], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "No odds " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => (idx + 1) * 2), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All odds " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx * 2 + 1), k: 2 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 2 + (i % 4) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 5 + (i % 8) } });
  }
  return cases;
}
