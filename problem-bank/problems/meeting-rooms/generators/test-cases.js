import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[0, 30], [5, 10], [15, 20]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[7, 10], [2, 4]] } });
  cases.push({ category: "basic", description: "Empty meetings", inputs: { intervals: [] } });
  cases.push({ category: "basic", description: "Single meeting", inputs: { intervals: [[1, 5]] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 3], [3, 5], [5, 7]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Touching meetings " + i, inputs: { intervals: [[1, 2], [2, 3]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Complete overlap " + i, inputs: { intervals: [[1, 10], [2, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 4, 10);
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < count; k++) {
      intervals.push([cur, cur + 2]);
      cur += randomInt(rng, 1, 4);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 15, 30);
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < count; k++) {
      intervals.push([cur, cur + 3]);
      cur += randomInt(rng, 2, 5);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
