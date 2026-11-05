import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { stones: [2, 7, 4, 1, 8, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { stones: [1] } });
  cases.push({ category: "basic", description: "Two equal stones", inputs: { stones: [5, 5] } });
  cases.push({ category: "basic", description: "Two unequal stones", inputs: { stones: [10, 4] } });
  for (let i = 4; i < 10; i++) {
    const count = 3 + (i % 4);
    const stones = [];
    for (let j = 0; j < count; j++) stones.push(randomInt(rng, 1, 30));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { stones } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const stones = [randomInt(rng, 100, 1000)];
    cases.push({ category: "edge", description: "Single stone " + i, inputs: { stones } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const val = randomInt(rng, 1, 50);
    const stones = [val, val, val, val];
    cases.push({ category: "corner", description: "All equal stones " + i, inputs: { stones } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 10, 30);
    const stones = [];
    for (let j = 0; j < count; j++) stones.push(randomInt(rng, 1, 200));
    cases.push({ category: "random", description: "Random stones " + i, inputs: { stones } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 40, 70);
    const stones = [];
    for (let j = 0; j < count; j++) stones.push(randomInt(rng, 1, 1000));
    cases.push({ category: "large", description: "Large stones " + i, inputs: { stones } });
  }

  return cases;
}
