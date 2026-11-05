export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 0] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 4, -1, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [7, 8, 9, 11, 12] } });
  cases.push({ category: "basic", description: "Single 1", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Single 2", inputs: { nums: [2] } });
  for (let i = 5; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, i + 2] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Negatives " + i, inputs: { nums: [-5, -4, -3, -2, -1] } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Sequential 1 to len " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 25) - 5);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 100) - 20);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
