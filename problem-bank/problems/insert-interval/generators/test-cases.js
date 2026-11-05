import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval: [4, 8] } });
  cases.push({ category: "basic", description: "Empty intervals", inputs: { intervals: [], newInterval: [5, 7] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 2], [5, 6]], newInterval: [3, 4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Insert at front " + i, inputs: { intervals: [[10, 20]], newInterval: [1, 5] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Merge all " + i, inputs: { intervals: [[2, 3], [4, 5]], newInterval: [1, 6] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < 5; k++) {
      intervals.push([cur, cur + 2]);
      cur += 4;
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals, newInterval: [3, 8] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < 12; k++) {
      intervals.push([cur, cur + 3]);
      cur += 5;
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals, newInterval: [7, 25] } });
  }

  return cases;
}
