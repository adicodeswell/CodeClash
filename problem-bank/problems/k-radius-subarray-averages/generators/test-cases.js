export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [7, 4, 3, 9, 1, 8, 5, 2, 6], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [100000], k: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [8], k: 100 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [1, 2, 3, 4, 5], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 4, 6, 8, 10, 12, 14], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = 0 " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx * 10), k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "k large " + i, inputs: { nums: [1, 2, 3], k: 5 + i } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const k = 1 + (i % 4);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 3 + (i % 8);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k } });
  }
  return cases;
}
