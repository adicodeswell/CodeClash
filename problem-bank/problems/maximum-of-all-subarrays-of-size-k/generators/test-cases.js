export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [1, 2, 3, 1, 4, 5, 2, 3, 6], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [8, 5, 10, 7, 9, 4, 15, 12, 90, 13], k: 4 } });
  cases.push({ category: "basic", description: "Single", inputs: { arr: [1], k: 1 } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { arr: [5, 4, 3, 2, 1], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, 3, 5, 2, 4, 6], k: (i % 4) + 1 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 7;
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => idx * 2), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: Array.from({ length: len }, () => 7), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 5);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 15);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k } });
  }
  return cases;
}
