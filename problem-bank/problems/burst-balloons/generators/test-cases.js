import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 1, 5, 8] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 5] } });
  cases.push({ category: "basic", description: "Single balloon", inputs: { nums: [7] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 3, 4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single balloon " + i, inputs: { nums: [randomInt(rng, 1, 20)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All ones " + i, inputs: { nums: [1, 1, 1, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 4, 8);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 10));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 10, 16);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 15));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
