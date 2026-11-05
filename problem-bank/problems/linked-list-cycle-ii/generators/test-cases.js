export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [3, 2, 0, -4], pos: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2], pos: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { head: [1], pos: -1 } });
  cases.push({ category: "basic", description: "No cycle", inputs: { head: [1, 2, 3, 4], pos: -1 } });
  cases.push({ category: "basic", description: "Self cycle tail", inputs: { head: [1, 2, 3, 4], pos: 3 } });
  cases.push({ category: "basic", description: "Mid cycle", inputs: { head: [10, 20, 30, 40, 50], pos: 2 } });
  cases.push({ category: "basic", description: "Cycle to head", inputs: { head: [5, 4, 3, 2, 1], pos: 0 } });
  cases.push({ category: "basic", description: "Single node cycle", inputs: { head: [100], pos: 0 } });
  cases.push({ category: "basic", description: "Small cycle", inputs: { head: [1, 2, 3], pos: 1 } });
  cases.push({ category: "basic", description: "No cycle 5", inputs: { head: [9, 8, 7, 6, 5], pos: -1 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const pos = i % 2 === 0 ? -1 : (i % len);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx + 1), pos } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const len = 10 + i;
    const pos = i;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx * 2), pos } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 5;
    const pos = i % 3 === 0 ? -1 : Math.floor(Math.random() * len);
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100), pos } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    const pos = i % 2 === 0 ? -1 : 400 + i * 20;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx), pos } });
  }

  return cases;
}