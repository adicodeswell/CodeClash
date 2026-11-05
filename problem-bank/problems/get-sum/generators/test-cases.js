export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "1 + 2", inputs: { a: 1, b: 2 } });
  cases.push({ category: "basic", description: "2 + 3", inputs: { a: 2, b: 3 } });
  cases.push({ category: "basic", description: "-1 + 1", inputs: { a: -1, b: 1 } });
  cases.push({ category: "basic", description: "0 + 0", inputs: { a: 0, b: 0 } });
  cases.push({ category: "basic", description: "0 + 5", inputs: { a: 0, b: 5 } });
  cases.push({ category: "basic", description: "5 + 0", inputs: { a: 5, b: 0 } });
  cases.push({ category: "basic", description: "-5 + 0", inputs: { a: -5, b: 0 } });
  cases.push({ category: "basic", description: "-2 + -3", inputs: { a: -2, b: -3 } });
  cases.push({ category: "basic", description: "10 + 20", inputs: { a: 10, b: 20 } });
  cases.push({ category: "basic", description: "-10 + 20", inputs: { a: -10, b: 20 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const a = (i - 17) * 50;
    cases.push({ category: "edge", description: "Opposites " + i, inputs: { a, b: -a } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const val = (i - 32) * 60;
    cases.push({ category: "corner", description: "Corner zero " + i, inputs: { a: val, b: 0 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const a = Math.floor(Math.random() * 1000) - 500;
    const b = Math.floor(Math.random() * 1000) - 500;
    cases.push({ category: "random", description: "Random " + i, inputs: { a, b } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const a = 500 + (i - 65) * 30;
    const b = 500 - (i - 65) * 20;
    cases.push({ category: "large", description: "Large " + i, inputs: { a, b } });
  }

  return cases;
}
