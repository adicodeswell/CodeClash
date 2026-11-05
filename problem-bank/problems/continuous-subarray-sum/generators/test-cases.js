export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [23, 2, 4, 6, 7], k: 6 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [23, 2, 6, 4, 7], k: 6 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [23, 2, 6, 4, 7], k: 13 } });
  cases.push({ category: "basic", description: "Two zeros", inputs: { nums: [0, 0], k: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5], k: 5 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Len 1 " + i, inputs: { nums: [i * 5], k: 5 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Multiples " + i, inputs: { nums: Array.from({ length: len }, () => 7), k: 7 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 6 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 17 } });
  }
  return cases;
}
