export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "11 -> 3", inputs: { n: 11 } });
  cases.push({ category: "basic", description: "128 -> 1", inputs: { n: 128 } });
  cases.push({ category: "basic", description: "2147483645 -> 30", inputs: { n: 2147483645 } });
  cases.push({ category: "basic", description: "1 -> 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "2 -> 1", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "3 -> 2", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "7 -> 3", inputs: { n: 7 } });
  cases.push({ category: "basic", description: "15 -> 4", inputs: { n: 15 } });
  cases.push({ category: "basic", description: "31 -> 5", inputs: { n: 31 } });
  cases.push({ category: "basic", description: "63 -> 6", inputs: { n: 63 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pow = Math.pow(2, (i - 10) * 2);
    cases.push({ category: "edge", description: "Power of 2 " + pow, inputs: { n: pow } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const allOnes = Math.pow(2, (i - 24) * 2) - 1;
    cases.push({ category: "corner", description: "All ones " + allOnes, inputs: { n: allOnes } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 2000000000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 2147483647 - (i - 65);
    cases.push({ category: "large", description: "Near INT_MAX " + i, inputs: { n } });
  }

  return cases;
}
