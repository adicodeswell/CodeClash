export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { k: 3, arr: [2, 1, 5, 1, 3, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { k: 2, arr: [2, 3, 4, 1, 5] } });
  cases.push({ category: "basic", description: "Single", inputs: { k: 1, arr: [10] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { k: 2, arr: [-5, -2, -8, -1] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { k: 2, arr: [1, 2, 3, 4, 5, i] } });
  }
  // Edge (15)
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { k: len, arr: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  // Corner (15)
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { k: 1, arr: Array.from({ length: len }, (_, idx) => idx * 10 - 50) } });
  }
  // Random (25)
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "random", description: "Random " + i, inputs: { k, arr } });
  }
  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 40;
    const k = 10 + (i % 20);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000);
    cases.push({ category: "large", description: "Large " + i, inputs: { k, arr } });
  }
  return cases;
}
