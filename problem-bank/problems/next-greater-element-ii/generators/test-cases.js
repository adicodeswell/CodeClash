export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3, 4, 3] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [10] } });
  cases.push({ category: "basic", description: "All equal", inputs: { nums: [5, 5, 5] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 2, 4] } });
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
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
