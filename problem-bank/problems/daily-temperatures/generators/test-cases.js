import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { temperatures: [30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { temperatures: [30, 60, 90] } });
  cases.push({ category: "basic", description: "Single temp", inputs: { temperatures: [50] } });
  cases.push({ category: "basic", description: "Strictly decreasing", inputs: { temperatures: [90, 80, 70, 60, 50] } });
  cases.push({ category: "basic", description: "Strictly increasing", inputs: { temperatures: [40, 50, 60, 70, 80] } });
  cases.push({ category: "basic", description: "All equal", inputs: { temperatures: [65, 65, 65, 65] } });
  cases.push({ category: "basic", description: "Valley", inputs: { temperatures: [80, 50, 40, 50, 85] } });
  cases.push({ category: "basic", description: "Peak", inputs: { temperatures: [40, 80, 30] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { temperatures: [50, 70, 50, 70] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { temperatures: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { temperatures: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { temperatures: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { temperatures: arr } });
  }

  return cases;
}
