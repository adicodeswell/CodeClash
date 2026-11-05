import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { triplets: [[2, 5, 3], [1, 8, 4], [1, 7, 5]], target: [2, 7, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { triplets: [[3, 4, 5], [4, 5, 6]], target: [3, 2, 5] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { triplets: [[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], target: [5, 5, 5] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { triplets: [[1, 2, 3]], target: [1, 2, 3] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Exact match " + i, inputs: { triplets: [[1, 1, 1]], target: [1, 1, 1] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Exceeds target " + i, inputs: { triplets: [[5, 1, 1]], target: [4, 1, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const triplets = [
      [randomInt(rng, 1, 5), randomInt(rng, 1, 5), randomInt(rng, 1, 5)],
      [randomInt(rng, 1, 5), randomInt(rng, 1, 5), randomInt(rng, 1, 5)],
      [randomInt(rng, 1, 5), randomInt(rng, 1, 5), randomInt(rng, 1, 5)]
    ];
    cases.push({ category: "random", description: "Random " + i, inputs: { triplets, target: [5, 5, 5] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const triplets = [];
    for (let k = 0; k < 10; k++) {
      triplets.push([randomInt(rng, 1, 10), randomInt(rng, 1, 10), randomInt(rng, 1, 10)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { triplets, target: [10, 10, 10] } });
  }

  return cases;
}
