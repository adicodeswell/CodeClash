import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { prices: [7, 1, 5, 3, 6, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { prices: [7, 6, 4, 3, 1] } });
  cases.push({ category: "basic", description: "Single element", inputs: { prices: [10] } });
  cases.push({ category: "basic", description: "Two elements up", inputs: { prices: [1, 5] } });
  cases.push({ category: "basic", description: "Two elements down", inputs: { prices: [5, 1] } });
  cases.push({ category: "basic", description: "Equal prices", inputs: { prices: [3, 3, 3, 3] } });
  cases.push({ category: "basic", description: "Valley then peak", inputs: { prices: [2, 4, 1] } });
  cases.push({ category: "basic", description: "Steady climb", inputs: { prices: [1, 2, 3, 4, 5, 6] } });
  cases.push({ category: "basic", description: "Late spike", inputs: { prices: [5, 4, 3, 2, 20] } });
  cases.push({ category: "basic", description: "Early spike", inputs: { prices: [20, 5, 4, 3, 2] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { prices: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { prices: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { prices: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 100, 300);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 10000));
    cases.push({ category: "large", description: "Large " + i, inputs: { prices: arr } });
  }

  return cases;
}
