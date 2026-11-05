import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { cost: [10, 15, 20] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { cost: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { cost: [10, 15] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { cost: [1, 2, 3, 4, 5] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Length 2 " + i, inputs: { cost: [randomInt(rng, 0, 50), randomInt(rng, 0, 50)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All zeros " + i, inputs: { cost: [0, 0, 0, 0] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 30);
    const cost = [];
    for (let j = 0; j < len; j++) cost.push(randomInt(rng, 0, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { cost } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 50, 100);
    const cost = [];
    for (let j = 0; j < len; j++) cost.push(randomInt(rng, 0, 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { cost } });
  }

  return cases;
}
