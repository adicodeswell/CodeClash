export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 0, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 1, 1, 0, 1, 1, 0, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 1, 1] } });
  cases.push({ category: "basic", description: "Single 1", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Single 0", inputs: { nums: [0] } });
  for (let i = 5; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 0, 1, 1, 0, 1] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All ones " + i, inputs: { nums: new Array(len).fill(1) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All zeros " + i, inputs: { nums: new Array(len).fill(0) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => (Math.random() < 0.65 ? 1 : 0));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => (Math.random() < 0.75 ? 1 : 0));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
