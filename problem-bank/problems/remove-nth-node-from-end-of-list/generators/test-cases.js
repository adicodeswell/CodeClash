import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], n: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2], n: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { head: [1, 2], n: 2 } });
  cases.push({ category: "basic", description: "Remove head", inputs: { head: [1, 2, 3], n: 3 } });
  cases.push({ category: "basic", description: "Remove tail", inputs: { head: [1, 2, 3], n: 1 } });
  cases.push({ category: "basic", description: "Remove middle", inputs: { head: [1, 2, 3, 4], n: 2 } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { head: [7, 7, 7], n: 1 } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0, 0], n: 2 } });
  cases.push({ category: "basic", description: "Five elements n=5", inputs: { head: [10, 20, 30, 40, 50], n: 5 } });
  cases.push({ category: "basic", description: "Five elements n=1", inputs: { head: [10, 20, 30, 40, 50], n: 1 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 5);
    const n = 1 + (i % len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr, n } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 10;
    const n = 1 + (i % len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr, n } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 20);
    const n = randomInt(rng, 1, len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr, n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 30);
    const n = randomInt(rng, 1, len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr, n } });
  }

  return cases;
}
