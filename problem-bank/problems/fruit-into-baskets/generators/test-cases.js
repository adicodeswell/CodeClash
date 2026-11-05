export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { fruits: [1, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { fruits: [0, 1, 2, 2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { fruits: [1, 2, 3, 2, 2] } });
  cases.push({ category: "basic", description: "Single", inputs: { fruits: [1] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { fruits: [1, 2, 1, 3, 3, 2] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All same " + i, inputs: { fruits: new Array(len).fill(1) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Alternating " + i, inputs: { fruits: Array.from({ length: len }, (_, idx) => idx % 2) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const fruits = Array.from({ length: len }, () => Math.floor(Math.random() * 5));
    cases.push({ category: "random", description: "Random " + i, inputs: { fruits } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const fruits = Array.from({ length: len }, () => Math.floor(Math.random() * 8));
    cases.push({ category: "large", description: "Large " + i, inputs: { fruits } });
  }
  return cases;
}
