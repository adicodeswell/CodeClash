export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 3, 4, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 1, 1, 2, 3] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "All distinct", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Duplicate at start", inputs: { head: [1, 1, 2] } });
  cases.push({ category: "basic", description: "Duplicate at end", inputs: { head: [1, 2, 2] } });
  cases.push({ category: "basic", description: "Two pairs in middle", inputs: { head: [1, 2, 2, 3, 3, 4] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { head: [-3, -3, -2, -1, -1, 0, 1, 1] } });
  cases.push({ category: "basic", description: "Tens", inputs: { head: [10, 10, 20, 30, 30, 40] } });
  cases.push({ category: "basic", description: "Triple duplicates", inputs: { head: [1, 2, 2, 2, 3, 4, 4, 5] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = [999];
    for (let j = 0; j <= i; j++) {
      head.unshift(j, j);
    }
    head.sort((a, b) => a - b);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 3 }, (_, idx) => idx + 1);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const items = [];
    const numPairs = (i % 10) + 1;
    for (let p = 0; p < numPairs; p++) {
      const val = p * 3;
      items.push(val, val);
    }
    items.push(999);
    items.sort((a, b) => a - b);
    cases.push({ category: "random", description: "Random " + i, inputs: { head: items } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const items = [];
    for (let j = 0; j < 100; j++) {
      items.push(j, j);
    }
    items.push(500, 600);
    items.sort((a, b) => a - b);
    cases.push({ category: "large", description: "Large " + i, inputs: { head: items } });
  }

  return cases;
}