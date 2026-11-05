export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { digits: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { digits: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { digits: [9] } });
  cases.push({ category: "basic", description: "Zero", inputs: { digits: [0] } });
  cases.push({ category: "basic", description: "19", inputs: { digits: [1, 9] } });
  cases.push({ category: "basic", description: "99", inputs: { digits: [9, 9] } });
  cases.push({ category: "basic", description: "999", inputs: { digits: [9, 9, 9] } });
  cases.push({ category: "basic", description: "199", inputs: { digits: [1, 9, 9] } });
  cases.push({ category: "basic", description: "899", inputs: { digits: [8, 9, 9] } });
  cases.push({ category: "basic", description: "100", inputs: { digits: [1, 0, 0] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = i - 9;
    cases.push({ category: "edge", description: "All nines " + len, inputs: { digits: new Array(len).fill(9) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = (i - 24);
    const arr = [i % 9 + 1, ...new Array(len).fill(0)];
    cases.push({ category: "corner", description: "Leading digit with zeroes " + i, inputs: { digits: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = 3 + (i % 15);
    const first = Math.floor(Math.random() * 9) + 1;
    const rest = Array.from({ length: len - 1 }, () => Math.floor(Math.random() * 10));
    cases.push({ category: "random", description: "Random " + i, inputs: { digits: [first, ...rest] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 40 + (i - 65) * 3;
    const first = Math.floor(Math.random() * 9) + 1;
    const rest = Array.from({ length: len - 1 }, () => Math.floor(Math.random() * 10));
    cases.push({ category: "large", description: "Large " + i, inputs: { digits: [first, ...rest] } });
  }

  return cases;
}
