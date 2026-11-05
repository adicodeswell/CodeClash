import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { coins: [1, 2, 5], amount: 11 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { coins: [2], amount: 3 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { coins: [1], amount: 0 } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { coins: [1, 3, 4], amount: 6 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero amount " + i, inputs: { coins: [1, 2], amount: 0 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Amount 1 " + i, inputs: { coins: [1], amount: 1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const coins = [1, 2, 5, 10];
    const amount = randomInt(rng, 10, 50);
    cases.push({ category: "random", description: "Random " + i, inputs: { coins, amount } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const coins = [1, 5, 10, 25];
    const amount = randomInt(rng, 60, 200);
    cases.push({ category: "large", description: "Large " + i, inputs: { coins, amount } });
  }

  return cases;
}
