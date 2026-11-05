export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { num: 240, k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { num: 430043, k: 2 } });
  cases.push({ category: "basic", description: "Single digit", inputs: { num: 5, k: 1 } });
  cases.push({ category: "basic", description: "k = length", inputs: { num: 1234, k: 4 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { num: 1000 + i * 25, k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "All ones " + i, inputs: { num: 111111, k: (i % 5) + 1 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Zeroes inside " + i, inputs: { num: 100000 + i, k: 2 } });
  }
  for (let i = 40; i < 65; i++) {
    const num = Math.floor(Math.random() * 900000) + 100000;
    cases.push({ category: "random", description: "Random " + i, inputs: { num, k: 2 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const num = Math.floor(Math.random() * 900000000) + 100000000;
    cases.push({ category: "large", description: "Large " + i, inputs: { num, k: 3 + (i % 4) } });
  }
  return cases;
}
