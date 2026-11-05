export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [-8, 2, 3, -6, 10], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [12, -1, -7, 8, -15, 30, 16, 28], k: 3 } });
  cases.push({ category: "basic", description: "All positive", inputs: { arr: [1, 2, 3, 4], k: 2 } });
  cases.push({ category: "basic", description: "All negative", inputs: { arr: [-1, -2, -3, -4], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, -2, 3, -4, 5, -6], k: (i % 4) + 1 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 7;
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => (idx % 2 === 0 ? -idx : idx)), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: Array.from({ length: len }, () => -5), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 5);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 15);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k } });
  }
  return cases;
}
