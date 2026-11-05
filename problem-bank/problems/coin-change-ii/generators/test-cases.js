import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { amount: 5, coins: [1, 2, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { amount: 3, coins: [2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { amount: 10, coins: [10] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { amount: 8, coins: [1, 2, 4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero amount " + i, inputs: { amount: 0, coins: [1, 2, 5] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Amount 1 " + i, inputs: { amount: 1, coins: [2, 3] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const amount = randomInt(rng, 10, 40);
    cases.push({ category: "random", description: "Random " + i, inputs: { amount, coins: [1, 2, 5, 10] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const amount = randomInt(rng, 50, 150);
    cases.push({ category: "large", description: "Large " + i, inputs: { amount, coins: [1, 2, 5, 10, 20] } });
  }

  return cases;
}
