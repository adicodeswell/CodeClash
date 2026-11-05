export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "Three elements", inputs: { nums: [1, 1, 2] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 1, 1, 2, 2, 2, 3] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Single majority " + i, inputs: { nums: new Array(len).fill(i) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Two majorities " + i, inputs: { nums: [...new Array(len).fill(1), ...new Array(len).fill(2), 3] } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const mCount = Math.floor(len / 2);
    const nums = [...new Array(mCount).fill(99), ...Array.from({ length: len - mCount }, () => Math.floor(Math.random() * 5))];
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const mCount = Math.floor(len / 2);
    const nums = [...new Array(mCount).fill(42), ...Array.from({ length: len - mCount }, () => Math.floor(Math.random() * 10))];
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
