export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { a: 2, b: 6, c: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { a: 4, b: 2, c: 7 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { a: 1, b: 2, c: 3 } });
  cases.push({ category: "basic", description: "All equal", inputs: { a: 5, b: 5, c: 5 } });
  cases.push({ category: "basic", description: "Zero flips already satisfied", inputs: { a: 4, b: 1, c: 5 } });
  cases.push({ category: "basic", description: "Double flip needed", inputs: { a: 3, b: 3, c: 0 } });
  cases.push({ category: "basic", description: "Powers of two", inputs: { a: 1, b: 2, c: 4 } });
  cases.push({ category: "basic", description: "High bits", inputs: { a: 1024, b: 2048, c: 4096 } });
  cases.push({ category: "basic", description: "Mixed bits", inputs: { a: 7, b: 7, c: 0 } });
  cases.push({ category: "basic", description: "Target has all ones", inputs: { a: 0, b: 0, c: 15 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { a: i + 1, b: (i + 1) * 2, c: (i + 1) * 3 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { a: Math.pow(2, i), b: Math.pow(2, i), c: 0 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const a = Math.floor(Math.random() * 1000) + 1;
    const b = Math.floor(Math.random() * 1000) + 1;
    const c = Math.floor(Math.random() * 1000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { a, b, c } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const a = 10000000 + i * 1234;
    const b = 20000000 + i * 5678;
    const c = 30000000 + i * 9101;
    cases.push({ category: "large", description: "Large " + i, inputs: { a, b, c } });
  }

  return cases;
}