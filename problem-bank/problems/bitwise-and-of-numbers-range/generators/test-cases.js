export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { left: 5, right: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { left: 0, right: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { left: 1, right: 2147483647 } });
  cases.push({ category: "basic", description: "Equal numbers", inputs: { left: 10, right: 10 } });
  cases.push({ category: "basic", description: "Power of 2 span", inputs: { left: 8, right: 15 } });
  cases.push({ category: "basic", description: "Crosses power of 2", inputs: { left: 3, right: 4 } });
  cases.push({ category: "basic", description: "Small span", inputs: { left: 12, right: 13 } });
  cases.push({ category: "basic", description: "Zero start", inputs: { left: 0, right: 5 } });
  cases.push({ category: "basic", description: "Powers of two", inputs: { left: 16, right: 31 } });
  cases.push({ category: "basic", description: "Single bit difference", inputs: { left: 6, right: 7 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const left = i * 2;
    const right = left + 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { left, right } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const left = Math.pow(2, i);
    const right = Math.pow(2, i + 1) - 1;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { left, right } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const left = Math.floor(Math.random() * 1000) + 1;
    const right = left + Math.floor(Math.random() * 50);
    cases.push({ category: "random", description: "Random " + i, inputs: { left, right } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const left = 1000000 + i * 1000;
    const right = left + (i * 200 + 50);
    cases.push({ category: "large", description: "Large " + i, inputs: { left, right } });
  }

  return cases;
}