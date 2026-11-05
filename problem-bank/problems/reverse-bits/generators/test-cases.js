export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 43261596 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "0", inputs: { n: 0 } });
  cases.push({ category: "basic", description: "2", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "4", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "3", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "7", inputs: { n: 7 } });
  cases.push({ category: "basic", description: "2147483648", inputs: { n: 2147483648 } });
  cases.push({ category: "basic", description: "4294967295", inputs: { n: 4294967295 } });
  cases.push({ category: "basic", description: "1073741824", inputs: { n: 1073741824 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pow = Math.pow(2, i);
    cases.push({ category: "edge", description: "Power of 2 " + pow, inputs: { n: pow } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const allOnes = Math.pow(2, i - 15) - 1;
    cases.push({ category: "corner", description: "All ones " + allOnes, inputs: { n: allOnes } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 4000000000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 4294967295 - (i - 65);
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
