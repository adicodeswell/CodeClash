export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { cardPoints: [1, 2, 3, 4, 5, 6, 1], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { cardPoints: [2, 2, 2], k: 2 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { cardPoints: [9, 7, 7, 9, 7, 7, 9], k: 7 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { cardPoints: [10, 1, 20], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { cardPoints: [1, 2, 3, 4, 5, 6], k: i - 3 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { cardPoints: Array.from({ length: len }, (_, idx) => idx + 1), k: len } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { cardPoints: Array.from({ length: len }, () => 5), k: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const cardPoints = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { cardPoints, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 25);
    const cardPoints = Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { cardPoints, k } });
  }
  return cases;
}
