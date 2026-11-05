export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [1, 2, 1, 3, 4, 2, 3], k: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [4, 1, 1], k: 2 } });
  cases.push({ category: "basic", description: "All same", inputs: { arr: [5, 5, 5, 5], k: 2 } });
  cases.push({ category: "basic", description: "All distinct", inputs: { arr: [1, 2, 3, 4], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, 2, 2, 3, 3, 4], k: (i % 4) + 1 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 7;
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => idx + 1), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => idx % 3 + 1), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 6);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 8) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 30;
    const k = 5 + (i % 20);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k } });
  }
  return cases;
}
