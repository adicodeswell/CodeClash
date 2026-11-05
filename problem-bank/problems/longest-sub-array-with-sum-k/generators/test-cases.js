export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [10, 5, 2, 7, 1, 9], k: 15 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [-1, 2, 3], k: 6 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { arr: [1, -1, 5, -2, 3], k: 3 } });
  cases.push({ category: "basic", description: "Single match", inputs: { arr: [5], k: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, 2, 3, 4, 5], k: 9 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero sum with positives and negatives " + i, inputs: { arr: [i, -i, i, -i], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "No match " + i, inputs: { arr: new Array(len).fill(10), k: 5 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 20) - 10);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k: 5 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k: 10 } });
  }
  return cases;
}
