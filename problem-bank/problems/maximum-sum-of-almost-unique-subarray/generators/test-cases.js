export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 6, 7, 3, 1, 7], m: 3, k: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [5, 9, 9, 2, 4, 5, 4], m: 1, k: 3 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2, 1, 2, 1, 2, 1], m: 3, k: 3 } });
  cases.push({ category: "basic", description: "m = 1", inputs: { nums: [1, 2, 3], m: 1, k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 3, 4, 5, 6, i], m: 2, k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "m = k " + i, inputs: { nums: [1, 2, 3, 4], m: 2, k: 2 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Repeated " + i, inputs: { nums: new Array(len).fill(10), m: 1, k: Math.min(3, len) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 2 + (i % 5);
    const m = 1 + (i % k);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, m, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 10);
    const m = 2 + (i % 4);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, m, k } });
  }
  return cases;
}
