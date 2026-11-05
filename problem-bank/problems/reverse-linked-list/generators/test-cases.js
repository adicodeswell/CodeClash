import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [10] } });
  cases.push({ category: "basic", description: "Three nodes", inputs: { head: [7, 8, 9] } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { head: [2, 2, 2] } });
  cases.push({ category: "basic", description: "Negative numbers", inputs: { head: [-1, -2, -3] } });
  cases.push({ category: "basic", description: "Mixed signs", inputs: { head: [-5, 0, 5] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0] } });
  cases.push({ category: "basic", description: "Even length", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [1, 0, 1, 0] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 2 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -50, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 12;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 15, 40);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 50, 150);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr } });
  }

  return cases;
}
