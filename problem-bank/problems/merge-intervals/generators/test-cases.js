import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[1, 4], [4, 5]] } });
  cases.push({ category: "basic", description: "Single interval", inputs: { intervals: [[1, 5]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 4], [2, 3]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Point intervals " + i, inputs: { intervals: [[1, 1], [2, 2]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All overlapping " + i, inputs: { intervals: [[1, 10], [2, 8], [3, 6]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 5, 12);
    const intervals = [];
    for (let k = 0; k < count; k++) {
      const s = randomInt(rng, 1, 50);
      intervals.push([s, s + randomInt(rng, 1, 10)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 20, 40);
    const intervals = [];
    for (let k = 0; k < count; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 1, 15)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
