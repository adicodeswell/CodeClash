import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 2, 1, 5, 6, 4], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [42], k: 1 } });
  for (let i = 3; i < 10; i++) {
    const nums = [];
    for (let j = 0; j < 6; j++) nums.push(randomInt(rng, 1, 50));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums, k: randomInt(rng, 1, 6) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const nums = [randomInt(rng, -100, 100)];
    cases.push({ category: "edge", description: "Length 1 " + i, inputs: { nums, k: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const v = randomInt(rng, -50, 50);
    const nums = [v, v, v, v, v];
    cases.push({ category: "corner", description: "All equal elements " + i, inputs: { nums, k: randomInt(rng, 1, 5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 15, 40);
    const nums = [];
    for (let j = 0; j < n; j++) nums.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: randomInt(rng, 1, n) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 50, 100);
    const nums = [];
    for (let j = 0; j < n; j++) nums.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: randomInt(rng, 1, n) } });
  }

  return cases;
}
