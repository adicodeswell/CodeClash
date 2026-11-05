export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 3, 2, 3, 3], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 4, 2, 1], k: 3 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [5, 2, 5], k: 1 } });
  cases.push({ category: "basic", description: "All same", inputs: { nums: [2, 2, 2], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 5, 2, 5, 5, 3], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k > freq " + i, inputs: { nums: [1, 2, 3], k: i } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 with len " + len, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), k: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 2 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 10) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 3 + (i % 5) } });
  }
  return cases;
}
