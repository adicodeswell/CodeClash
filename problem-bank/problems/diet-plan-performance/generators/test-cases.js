export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { calories: [1, 2, 3, 4, 5], k: 1, lower: 3, upper: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { calories: [3, 2], k: 2, lower: 0, upper: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { calories: [6, 5, 0, 0], k: 2, lower: 1, upper: 5 } });
  cases.push({ category: "basic", description: "Zero points", inputs: { calories: [2, 2, 2], k: 2, lower: 3, upper: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { calories: [1000, 2000, 3000, 4000], k: 2, lower: 2500, upper: 5500 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { calories: new Array(len).fill(100), k: len, lower: 50, upper: 200 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { calories: Array.from({ length: len }, (_, idx) => idx * 10), k: 1, lower: 20, upper: 50 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 5);
    const calories = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { calories, k, lower: 200, upper: 400 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 15);
    const calories = Array.from({ length: len }, () => Math.floor(Math.random() * 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { calories, k, lower: 2000, upper: 5000 } });
  }
  return cases;
}
