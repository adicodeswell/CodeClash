import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: { intervals: [[1, 4], [2, 4], [3, 6], [4, 4]], queries: [2, 3, 4, 5] }
  });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: { intervals: [[2, 3], [2, 5], [1, 8], [20, 25]], queries: [2, 19, 5, 22] }
  });

  for (let i = 2; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 5], [3, 7]], queries: [2, 4, 6] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "No interval matches " + i, inputs: { intervals: [[10, 20]], queries: [5] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Point interval " + i, inputs: { intervals: [[5, 5]], queries: [5] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const intervals = [];
    for (let k = 0; k < 6; k++) {
      const s = randomInt(rng, 1, 30);
      intervals.push([s, s + randomInt(rng, 2, 8)]);
    }
    const queries = [randomInt(rng, 1, 35), randomInt(rng, 1, 35)];
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals, queries } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const intervals = [];
    for (let k = 0; k < 15; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 5, 20)]);
    }
    const queries = [];
    for (let q = 0; q < 8; q++) queries.push(randomInt(rng, 1, 120));
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals, queries } });
  }

  return cases;
}
