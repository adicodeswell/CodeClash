import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Single element", inputs: { head: [42] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { head: [10, 20] } });
  cases.push({ category: "basic", description: "Three elements", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Six elements", inputs: { head: [1, 2, 3, 4, 5, 6] } });
  cases.push({ category: "basic", description: "Seven elements", inputs: { head: [1, 2, 3, 4, 5, 6, 7] } });
  cases.push({ category: "basic", description: "Equal elements", inputs: { head: [5, 5, 5, 5] } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [1, 10, 2, 20] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 200));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr } });
  }

  return cases;
}
