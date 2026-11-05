import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 5, 11, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3, 5] } });
  cases.push({ category: "basic", description: "Two equal", inputs: { nums: [4, 4] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 2, 3, 5] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single element " + i, inputs: { nums: [randomInt(rng, 1, 20)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Odd sum " + i, inputs: { nums: [1, 2, 4] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const half = [randomInt(rng, 1, 15), randomInt(rng, 1, 15), randomInt(rng, 1, 15)];
    const nums = [...half, ...half];
    cases.push({ category: "random", description: "Random balanced " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const half = [randomInt(rng, 5, 20), randomInt(rng, 5, 20), randomInt(rng, 5, 20), randomInt(rng, 5, 20)];
    const nums = [...half, ...half];
    cases.push({ category: "large", description: "Large balanced " + i, inputs: { nums } });
  }

  return cases;
}
