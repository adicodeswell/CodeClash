import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [1] } });

  for (let i = 3; i < 10; i++) {
    const count = 3;
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, 1, 9));
    cases.push({ category: "basic", description: "Basic 3-elem " + i, inputs: { nums: Array.from(set) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const single = [randomInt(rng, -10, 10)];
    cases.push({ category: "edge", description: "Single element " + i, inputs: { nums: single } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const pair = [randomInt(rng, -10, 0), randomInt(rng, 1, 10)];
    cases.push({ category: "corner", description: "Two elements " + i, inputs: { nums: pair } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = 4;
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -20, 20));
    cases.push({ category: "random", description: "Random 4-elem " + i, inputs: { nums: Array.from(set) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = 5;
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -30, 30));
    cases.push({ category: "large", description: "Large 5-elem " + i, inputs: { nums: Array.from(set) } });
  }

  return cases;
}
