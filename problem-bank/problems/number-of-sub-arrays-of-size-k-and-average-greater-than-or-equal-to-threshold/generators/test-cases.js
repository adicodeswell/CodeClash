export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [2, 2, 2, 2, 5, 5, 5, 8], k: 3, threshold: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [11, 13, 17, 23, 29, 31, 7, 5, 2, 3], k: 3, threshold: 5 } });
  cases.push({ category: "basic", description: "Zero threshold", inputs: { arr: [1, 2, 3], k: 2, threshold: 0 } });
  cases.push({ category: "basic", description: "None meet", inputs: { arr: [1, 1, 1], k: 2, threshold: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [2, 4, 6, 8, 10], k: 2, threshold: i } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: [i, i + 1, i + 2], k: 1, threshold: i + 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: new Array(len).fill(10), k: len, threshold: 10 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k, threshold: 25 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 30;
    const k = 5 + (i % 15);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k, threshold: 40 } });
  }
  return cases;
}
