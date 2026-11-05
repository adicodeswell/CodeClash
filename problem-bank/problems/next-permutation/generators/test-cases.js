export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 2, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 1, 5] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [1] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 2] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Descending " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => len - idx) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Ascending " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 5 + (i % 8);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 10));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 30 + (i - 65) * 3;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
