import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 3, -2, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [-2, 0, -1] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [-5] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [-2, 3, -4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single positive " + i, inputs: { nums: [randomInt(rng, 1, 10)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Zero elements " + i, inputs: { nums: [0, 0, 0] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 12);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -3, 3));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 15, 30);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -2, 2));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
