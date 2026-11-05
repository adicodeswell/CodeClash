export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], left: 2, right: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [5], left: 1, right: 1 } });
  cases.push({ category: "basic", description: "Reverse full 2", inputs: { head: [1, 2], left: 1, right: 2 } });
  cases.push({ category: "basic", description: "Reverse single element at start", inputs: { head: [1, 2, 3], left: 1, right: 1 } });
  cases.push({ category: "basic", description: "Reverse single element at end", inputs: { head: [1, 2, 3], left: 3, right: 3 } });
  cases.push({ category: "basic", description: "Reverse entire 6", inputs: { head: [10, 20, 30, 40, 50, 60], left: 1, right: 6 } });
  cases.push({ category: "basic", description: "Two elements reversed", inputs: { head: [3, 5], left: 1, right: 2 } });
  cases.push({ category: "basic", description: "Mid range 2 to 5", inputs: { head: [1, 2, 3, 4, 5, 6], left: 2, right: 5 } });
  cases.push({ category: "basic", description: "Mid 2 to 3", inputs: { head: [7, 8, 9, 10], left: 2, right: 3 } });
  cases.push({ category: "basic", description: "Prefix reverse", inputs: { head: [10, 9, 8, 7, 6], left: 1, right: 4 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 3 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, left: 1, right: head.length } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 10 + i }, (_, idx) => (idx + 1) * 10);
    const mid = Math.floor(head.length / 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, left: mid, right: mid } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const left = Math.floor(Math.random() * (len - 1)) + 1;
    const right = Math.floor(Math.random() * (len - left + 1)) + left;
    cases.push({ category: "random", description: "Random " + i, inputs: { head, left, right } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 15;
    const head = Array.from({ length: len }, (_, idx) => idx);
    cases.push({ category: "large", description: "Large " + i, inputs: { head, left: 50 + i * 5, right: 250 + i * 5 } });
  }

  return cases;
}