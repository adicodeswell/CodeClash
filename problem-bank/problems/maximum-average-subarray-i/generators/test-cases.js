export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 12, -5, -6, 50, 3], k: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [5], k: 1 } });
  cases.push({ category: "basic", description: "All negative", inputs: { nums: [-1, -2, -3, -4], k: 2 } });
  cases.push({ category: "basic", description: "All positive", inputs: { nums: [10, 20, 30, 40], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, 6], k: i - 3 } });
  }
  // Edge (15)
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { nums: new Array(len).fill(i * 2), k: len } });
  }
  // Corner (15)
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx * 5 - 20), k: 1 } });
  }
  // Random (25)
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k } });
  }
  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 50;
    const k = 20 + (i % 30);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k } });
  }
  return cases;
}
