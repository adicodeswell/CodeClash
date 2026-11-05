export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [10, 5, 2, 6], k: 100 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3], k: 0 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [1, 2, 3], k: 1 } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5], k: 10 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 3, 4, 1, 2], k: 20 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 0 " + i, inputs: { nums: [i, i + 1], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All ones " + i, inputs: { nums: new Array(len).fill(1), k: 10 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 50 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 8) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 1000 } });
  }
  return cases;
}
