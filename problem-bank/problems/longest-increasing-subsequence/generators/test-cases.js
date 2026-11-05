import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [10, 9, 2, 5, 3, 7, 101, 18] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 0, 3, 2, 3] } });
  cases.push({ category: "basic", description: "Example 3 (all equal)", inputs: { nums: [7, 7, 7, 7, 7, 7, 7] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 6, 7, 9, 4, 10, 5, 6] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single element " + i, inputs: { nums: [randomInt(rng, -100, 100)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Strictly decreasing " + i, inputs: { nums: [5, 4, 3, 2, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 25);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -50, 50));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -500, 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
