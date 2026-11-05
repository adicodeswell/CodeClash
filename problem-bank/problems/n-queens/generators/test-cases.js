export function generateCases({ rng }) {
  const cases = [];

  // Valid n with solutions: 1, 4, 5, 6, 7, 8
  const validN = [1, 4, 5, 6, 7];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "n = 4", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "n = 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "n = 5", inputs: { n: 5 } });
  cases.push({ category: "basic", description: "n = 6", inputs: { n: 6 } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { n: 4 + (i % 3) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single queen " + i, inputs: { n: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner n=4 " + i, inputs: { n: 4 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = validN[i % validN.length];
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 5 + (i % 3); // 5, 6, 7
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
