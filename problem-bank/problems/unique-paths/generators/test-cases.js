import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { m: 3, n: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { m: 3, n: 2 } });
  cases.push({ category: "basic", description: "1x1 grid", inputs: { m: 1, n: 1 } });
  cases.push({ category: "basic", description: "1xN grid", inputs: { m: 1, n: 5 } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { m: 4, n: 4 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "m=1 " + i, inputs: { m: 1, n: 2 + (i % 5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "2x2 " + i, inputs: { m: 2, n: 2 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { m: randomInt(rng, 3, 10), n: randomInt(rng, 3, 10) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { m: randomInt(rng, 10, 18), n: randomInt(rng, 10, 18) } });
  }

  return cases;
}
