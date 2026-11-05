import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[0, 30], [5, 10], [15, 20]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[7, 10], [2, 4]] } });
  cases.push({ category: "basic", description: "Single meeting", inputs: { intervals: [[1, 10]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 4], [2, 5], [3, 6]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Consecutive " + i, inputs: { intervals: [[1, 2], [2, 3], [3, 4]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Identical meetings " + i, inputs: { intervals: [[1, 5], [1, 5], [1, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 15);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 40);
      intervals.push([s, s + randomInt(rng, 2, 10)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 50);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 5, 20)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
