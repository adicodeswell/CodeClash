import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1], k: 1 } });
  cases.push({ category: "basic", description: "k=1", inputs: { nums: [1, -1], k: 1 } });
  cases.push({ category: "basic", description: "k=nums.length", inputs: { nums: [9, 11], k: 2 } });
  cases.push({ category: "basic", description: "All decreasing", inputs: { nums: [7, 6, 5, 4, 3, 2, 1], k: 3 } });
  cases.push({ category: "basic", description: "All increasing", inputs: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 } });
  cases.push({ category: "basic", description: "Equal elements", inputs: { nums: [4, 4, 4, 4, 4], k: 2 } });
  cases.push({ category: "basic", description: "Alternating", inputs: { nums: [1, 3, 1, 3, 1, 3], k: 2 } });
  cases.push({ category: "basic", description: "Peak in middle", inputs: { nums: [1, 2, 10, 2, 1], k: 3 } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { nums: [-7, -8, -7, 5, 7, 1, 6, 0], k: 4 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const k = 1 + (i % len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -20, 20));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums: arr, k } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const k = 1 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: arr, k } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    const k = randomInt(rng, 2, Math.min(10, len));
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: arr, k } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const k = randomInt(rng, 5, 20);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: arr, k } });
  }

  return cases;
}
