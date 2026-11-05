export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  const known = [1, 2, 3, 4, 7, 10, 13, 19, 23, 28];
  for (let i = 0; i < 10; i++) {
    cases.push({ category: "basic", description: "Known " + known[i], inputs: { n: known[i] } });
  }

  // Edge (10 - 24)
  const edgeVals = [5, 6, 8, 9, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 25];
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + edgeVals[i - 10], inputs: { n: edgeVals[i - 10] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const val = Math.pow(10, (i % 6));
    cases.push({ category: "corner", description: "Power of 10 " + val, inputs: { n: val } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 2000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = Math.floor(Math.random() * 1000000000) + 1;
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
