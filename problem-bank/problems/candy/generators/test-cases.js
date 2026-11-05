export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { ratings: [1, 0, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { ratings: [1, 2, 2] } });
  cases.push({ category: "basic", description: "Single", inputs: { ratings: [10] } });
  cases.push({ category: "basic", description: "All same", inputs: { ratings: [5, 5, 5] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { ratings: [1, 3, 2, 2, 1] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Ascending " + i, inputs: { ratings: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Descending " + i, inputs: { ratings: Array.from({ length: len }, (_, idx) => len - idx) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const ratings = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    cases.push({ category: "random", description: "Random " + i, inputs: { ratings } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const ratings = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    cases.push({ category: "large", description: "Large " + i, inputs: { ratings } });
  }
  return cases;
}
