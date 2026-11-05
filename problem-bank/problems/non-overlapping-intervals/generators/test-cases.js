import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[1, 2], [1, 2], [1, 2]] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { intervals: [[1, 2], [2, 3]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 5], [2, 3], [3, 4]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Length 1 " + i, inputs: { intervals: [[1, 2]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Already disjoint " + i, inputs: { intervals: [[1, 2], [3, 4], [5, 6]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 15);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 30);
      intervals.push([s, s + randomInt(rng, 1, 8)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 50);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 1, 10)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
