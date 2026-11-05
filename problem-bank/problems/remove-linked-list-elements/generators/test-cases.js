export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 6, 3, 4, 5, 6], val: 6 } });
  cases.push({ category: "basic", description: "Prefix matches", inputs: { head: [7, 7, 7, 8], val: 7 } });
  cases.push({ category: "basic", description: "No match", inputs: { head: [1, 2, 3], val: 4 } });
  cases.push({ category: "basic", description: "Mixed", inputs: { head: [2, 1, 2, 2], val: 2 } });
  cases.push({ category: "basic", description: "Head match", inputs: { head: [5, 6, 7, 8], val: 5 } });
  cases.push({ category: "basic", description: "Tail match", inputs: { head: [5, 6, 7, 8], val: 8 } });
  cases.push({ category: "basic", description: "Surrounded", inputs: { head: [1, 1, 2, 1, 1], val: 1 } });
  cases.push({ category: "basic", description: "Multiple", inputs: { head: [10, 20, 30, 40], val: 25 } });
  cases.push({ category: "basic", description: "Consecutive", inputs: { head: [9, 9, 1], val: 9 } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [3, 4, 3, 4, 3, 4], val: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = [100, ...Array(i + 1).fill(i + 1)];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, val: i + 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 20 }, (_, idx) => (idx % 2 === 0 ? 99 : 10));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, val: 99 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 10;
    const target = (i % 5) + 1;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 5) + 1);
    head[0] = 99; // ensure at least one survives
    cases.push({ category: "random", description: "Random " + i, inputs: { head, val: target } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 20;
    const head = Array.from({ length: len }, (_, idx) => idx % 10 + 1);
    head[0] = 100;
    cases.push({ category: "large", description: "Large " + i, inputs: { head, val: 5 } });
  }

  return cases;
}