export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [-2, 0, 3, -5, 2, -1], queries: [[0, 2], [2, 5], [0, 5]] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5], queries: [[0, 0]] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2], queries: [[0, 0], [0, 1], [1, 1]] } });
  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5], queries: [[0, 2], [1, 4]] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "All zero " + i, inputs: { nums: [0, 0, 0, 0], queries: [[0, 1], [0, 3]] } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Full range " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), queries: [[0, len - 1]] } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    const queries = [];
    for (let q = 0; q < 5; q++) {
      const l = Math.floor(Math.random() * len);
      const r = l + Math.floor(Math.random() * (len - l));
      queries.push([l, r]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, queries } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const queries = [];
    for (let q = 0; q < 10; q++) {
      const l = Math.floor(Math.random() * len);
      const r = l + Math.floor(Math.random() * (len - l));
      queries.push([l, r]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, queries } });
  }
  return cases;
}
