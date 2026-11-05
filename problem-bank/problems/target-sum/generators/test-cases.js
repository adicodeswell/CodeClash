import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 1, 1, 1], target: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1], target: 1 } });
  cases.push({ category: "basic", description: "Target not reachable", inputs: { nums: [1, 2], target: 5 } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 1], target: 0 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero elements " + i, inputs: { nums: [0, 0, 1], target: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Target negative " + i, inputs: { nums: [1, 2, 1], target: -2 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 8);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, target: randomInt(rng, -2, 4) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 8, 12);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, target: randomInt(rng, -5, 5) } });
  }

  return cases;
}
