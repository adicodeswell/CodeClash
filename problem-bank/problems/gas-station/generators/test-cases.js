import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { gas: [2, 3, 4], cost: [3, 4, 3] } });
  cases.push({ category: "basic", description: "Single station ok", inputs: { gas: [5], cost: [4] } });
  cases.push({ category: "basic", description: "Single station not ok", inputs: { gas: [3], cost: [5] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { gas: [3, 1, 1], cost: [1, 2, 2] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Exact balance " + i, inputs: { gas: [2, 2], cost: [2, 2] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner start at 0 " + i, inputs: { gas: [10, 1, 1], cost: [2, 2, 2] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 6, 15);
    const gas = [];
    const cost = [];
    for (let j = 0; j < len; j++) {
      gas.push(randomInt(rng, 1, 10));
      cost.push(randomInt(rng, 1, 10));
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { gas, cost } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 50);
    const gas = [];
    const cost = [];
    for (let j = 0; j < len; j++) {
      gas.push(randomInt(rng, 5, 20));
      cost.push(randomInt(rng, 5, 20));
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { gas, cost } });
  }

  return cases;
}
