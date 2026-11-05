export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 5, 4, 2, 9, 9, 9], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [4, 4, 4], k: 3 } });
  cases.push({ category: "basic", description: "All distinct", inputs: { nums: [1, 2, 3, 4, 5], k: 2 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [5, 10, 2], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, i], k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Duplicates " + i, inputs: { nums: [i, i, i + 1, i + 2], k: 2 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All distinct len " + len, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), k: Math.min(3, len) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 2 + (i % 4);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 8) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 30;
    const k = 4 + (i % 8);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k } });
  }
  return cases;
}
