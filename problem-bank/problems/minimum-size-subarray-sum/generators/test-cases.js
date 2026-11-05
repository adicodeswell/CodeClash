export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { target: 7, nums: [2, 3, 1, 2, 4, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { target: 4, nums: [1, 4, 4] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1] } });
  cases.push({ category: "basic", description: "Target = 1", inputs: { target: 1, nums: [2, 3] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { target: 10 + i, nums: [2, 5, 1, 8, 4, 3] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Unattainable target " + i, inputs: { target: 100, nums: [1, 2, 3] } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single element " + i, inputs: { target: i, nums: [i] } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { target: 25, nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { target: 200, nums } });
  }
  return cases;
}
