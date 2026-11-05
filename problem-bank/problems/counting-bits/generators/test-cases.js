export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "n = 2", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "n = 5", inputs: { n: 5 } });
  cases.push({ category: "basic", description: "n = 0", inputs: { n: 0 } });
  cases.push({ category: "basic", description: "n = 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "n = 3", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "n = 4", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "n = 7", inputs: { n: 7 } });
  cases.push({ category: "basic", description: "n = 8", inputs: { n: 8 } });
  cases.push({ category: "basic", description: "n = 10", inputs: { n: 10 } });
  cases.push({ category: "basic", description: "n = 15", inputs: { n: 15 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pow = Math.pow(2, (i - 10) % 8 + 2);
    cases.push({ category: "edge", description: "Power of 2 " + pow, inputs: { n: pow } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const powM1 = Math.pow(2, (i - 24) % 8 + 2) - 1;
    cases.push({ category: "corner", description: "Power of 2 minus 1 " + powM1, inputs: { n: powM1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 200) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 500 + (i - 65) * 50;
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
