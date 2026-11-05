import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { prices: [1, 2, 3, 0, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { prices: [1] } });
  cases.push({ category: "basic", description: "Two days profit", inputs: { prices: [1, 5] } });
  cases.push({ category: "basic", description: "Two days loss", inputs: { prices: [5, 1] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { prices: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single day " + i, inputs: { prices: [randomInt(rng, 1, 100)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Decreasing " + i, inputs: { prices: [10, 8, 6, 4, 2] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 25);
    const p = [];
    for (let j = 0; j < len; j++) p.push(randomInt(rng, 1, 50));
    cases.push({ category: "random", description: "Random " + i, inputs: { prices: p } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const p = [];
    for (let j = 0; j < len; j++) p.push(randomInt(rng, 1, 200));
    cases.push({ category: "large", description: "Large " + i, inputs: { prices: p } });
  }

  return cases;
}
