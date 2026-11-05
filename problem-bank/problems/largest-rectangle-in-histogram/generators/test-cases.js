import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { heights: [2, 1, 5, 6, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { heights: [2, 4] } });
  cases.push({ category: "basic", description: "Single bar", inputs: { heights: [5] } });
  cases.push({ category: "basic", description: "All equal", inputs: { heights: [4, 4, 4, 4] } });
  cases.push({ category: "basic", description: "Increasing", inputs: { heights: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { heights: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "With zero", inputs: { heights: [2, 0, 2] } });
  cases.push({ category: "basic", description: "Spike", inputs: { heights: [1, 10, 1] } });
  cases.push({ category: "basic", description: "Valley", inputs: { heights: [6, 1, 6] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { heights: [2, 5, 2, 5] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 20));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { heights: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 50));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { heights: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { heights: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { heights: arr } });
  }

  return cases;
}
