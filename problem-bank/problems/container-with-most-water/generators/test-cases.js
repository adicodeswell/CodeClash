import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { height: [1, 1] } });
  cases.push({ category: "basic", description: "Ascending", inputs: { height: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Descending", inputs: { height: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Equal heights", inputs: { height: [4, 4, 4, 4] } });
  cases.push({ category: "basic", description: "Peak in middle", inputs: { height: [1, 10, 1] } });
  cases.push({ category: "basic", description: "Two high ends", inputs: { height: [10, 1, 1, 10] } });
  cases.push({ category: "basic", description: "Zeros present", inputs: { height: [0, 2, 0] } });
  cases.push({ category: "basic", description: "Plateau", inputs: { height: [3, 7, 7, 3] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { height: [1, 5, 2, 6, 1] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 30));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { height: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { height: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 30, 80);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { height: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 150, 400);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 10000));
    cases.push({ category: "large", description: "Large " + i, inputs: { height: arr } });
  }

  return cases;
}
