export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 1, 4, 2], p: 6 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [6, 3, 5, 2], p: 9 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2, 3], p: 3 } });
  cases.push({ category: "basic", description: "Impossible", inputs: { nums: [1, 2], p: 7 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 4, 6, 8, 10], p: 5 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single cannot remove whole " + i, inputs: { nums: [i], p: i + 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Already divisible " + i, inputs: { nums: Array.from({ length: len }, () => 4), p: 4 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, p: 7 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, p: 13 } });
  }
  return cases;
}
