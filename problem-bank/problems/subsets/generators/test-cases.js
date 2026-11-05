import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { nums: [-1, 0, 1] } });

  for (let i = 4; i < 10; i++) {
    const count = 3 + (i % 3);
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -10, 10));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: Array.from(set) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const set = new Set();
    while (set.size < 2) set.add(randomInt(rng, -20, 20));
    cases.push({ category: "edge", description: "Two elements edge " + i, inputs: { nums: Array.from(set) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const single = [randomInt(rng, -10, 10)];
    cases.push({ category: "corner", description: "Single element " + i, inputs: { nums: single } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 4, 6);
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -30, 30));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: Array.from(set) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 6, 8);
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -50, 50));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: Array.from(set) } });
  }

  return cases;
}
