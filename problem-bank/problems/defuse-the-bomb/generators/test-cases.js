export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { code: [5, 7, 1, 4], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { code: [1, 2, 3, 4], k: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { code: [2, 4, 9, 3], k: -2 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { code: [10, 20, 30], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { code: [1, 2, 3, 4, 5], k: (i % 4) - 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero k " + i, inputs: { code: [i, i + 1, i + 2], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Negative k " + i, inputs: { code: Array.from({ length: len }, (_, idx) => idx + 1), k: -1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 5 + (i % 15);
    const k = (i % (len - 1)) * (i % 2 === 0 ? 1 : -1);
    const code = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { code, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 50 + (i - 65) * 2;
    const k = 5 * (i % 2 === 0 ? 1 : -1);
    const code = Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { code, k } });
  }
  return cases;
}
