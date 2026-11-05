export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [0, 1, 2], k: 4 } });
  cases.push({ category: "basic", description: "k is 0", inputs: { head: [1], k: 0 } });
  cases.push({ category: "basic", description: "Single node large k", inputs: { head: [1], k: 99 } });
  cases.push({ category: "basic", description: "Two nodes k=1", inputs: { head: [1, 2], k: 1 } });
  cases.push({ category: "basic", description: "Two nodes k=2", inputs: { head: [1, 2], k: 2 } });
  cases.push({ category: "basic", description: "Four nodes k=0", inputs: { head: [1, 2, 3, 4], k: 0 } });
  cases.push({ category: "basic", description: "Four nodes k=4", inputs: { head: [1, 2, 3, 4], k: 4 } });
  cases.push({ category: "basic", description: "Three nodes k=5", inputs: { head: [10, 20, 30], k: 5 } });
  cases.push({ category: "basic", description: "Four nodes k=3", inputs: { head: [5, 6, 7, 8], k: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 1 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, k: i + 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 10 }, (_, idx) => idx);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, k: 1000000000 + i } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 3;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const k = Math.floor(Math.random() * 1000);
    cases.push({ category: "random", description: "Random " + i, inputs: { head, k } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 10;
    const head = Array.from({ length: len }, (_, idx) => idx);
    cases.push({ category: "large", description: "Large " + i, inputs: { head, k: 987654321 } });
  }

  return cases;
}