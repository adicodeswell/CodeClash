export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [4, 5, 0, -2, -3, 1], k: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [5], k: 9 } });
  cases.push({ category: "basic", description: "All divisible", inputs: { nums: [5, 10, 15], k: 5 } });
  cases.push({ category: "basic", description: "Single match", inputs: { nums: [4], k: 4 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5], k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Negatives " + i, inputs: { nums: [-i, i, -i, i], k: 4 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All zero " + i, inputs: { nums: new Array(len).fill(0), k: 5 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 40) - 20);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 5 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 100) - 50);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 7 } });
  }
  return cases;
}
