import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 3, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Single house", inputs: { nums: [10] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [5, 1, 2, 10] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Two houses " + i, inputs: { nums: [randomInt(rng, 1, 50), randomInt(rng, 1, 50)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Three houses " + i, inputs: { nums: [randomInt(rng, 1, 30), randomInt(rng, 1, 30), randomInt(rng, 1, 30)] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 6, 20);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 200));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
