import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [2, 7, 9, 3, 1] } });
  cases.push({ category: "basic", description: "Single house", inputs: { nums: [5] } });
  cases.push({ category: "basic", description: "Two houses", inputs: { nums: [10, 20] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 1, 1, 2] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single house " + i, inputs: { nums: [randomInt(rng, 1, 100)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All zeros " + i, inputs: { nums: [0, 0, 0, 0] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 8, 20);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 0, 100));
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
