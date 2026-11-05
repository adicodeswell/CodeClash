export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k: 3 } });
  cases.push({ category: "basic", description: "All ones", inputs: { nums: [1, 1, 1], k: 1 } });
  cases.push({ category: "basic", description: "All zeros", inputs: { nums: [0, 0, 0], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 0, 1, 0, 1, 0, 1], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 0 " + i, inputs: { nums: [1, 0, 1, 1, 0], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k >= len " + i, inputs: { nums: new Array(len).fill(0), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => (Math.random() < 0.6 ? 1 : 0));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 2 + (i % 5) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => (Math.random() < 0.7 ? 1 : 0));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 10 + (i % 15) } });
  }
  return cases;
}
