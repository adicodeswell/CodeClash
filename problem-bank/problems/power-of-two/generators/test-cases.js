export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 16 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "Zero", inputs: { n: 0 } });
  cases.push({ category: "basic", description: "Negative", inputs: { n: -16 } });
  cases.push({ category: "basic", description: "Two", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "Four", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "Five", inputs: { n: 5 } });
  cases.push({ category: "basic", description: "Eight", inputs: { n: 8 } });
  cases.push({ category: "basic", description: "One less than power", inputs: { n: 15 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const n = Math.pow(2, i);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { n } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const n = -Math.pow(2, i);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { n } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const isPower = i % 2 === 0;
    const n = isPower ? Math.pow(2, (i % 28) + 1) : Math.floor(Math.random() * 100000) * 2 + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const isPower = i % 2 === 0;
    const exp = 15 + i;
    const n = isPower ? Math.pow(2, exp) : Math.pow(2, exp) - 1;
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}