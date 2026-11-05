import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "All identical", inputs: { nums: [1, 1, 1] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 2] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const v = randomInt(rng, -5, 5);
    cases.push({ category: "edge", description: "Two duplicates " + i, inputs: { nums: [v, v] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const v = randomInt(rng, -10, 10);
    cases.push({ category: "corner", description: "Single " + i, inputs: { nums: [v] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const nums = [
      randomInt(rng, 1, 4),
      randomInt(rng, 1, 4),
      randomInt(rng, 1, 4),
      randomInt(rng, 1, 4)
    ];
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const nums = [
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5)
    ];
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
