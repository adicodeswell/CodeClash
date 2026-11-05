import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { height: [4, 2, 0, 3, 2, 5] } });
  cases.push({ category: "basic", description: "Single bar", inputs: { height: [3] } });
  cases.push({ category: "basic", description: "Two bars", inputs: { height: [3, 2] } });
  cases.push({ category: "basic", description: "Simple bowl", inputs: { height: [3, 0, 3] } });
  cases.push({ category: "basic", description: "Flat terrain", inputs: { height: [2, 2, 2, 2] } });
  cases.push({ category: "basic", description: "Ascending slope", inputs: { height: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Descending slope", inputs: { height: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Pyramid", inputs: { height: [1, 3, 5, 3, 1] } });
  cases.push({ category: "basic", description: "V shape", inputs: { height: [5, 1, 5] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 15));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { height: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 50));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { height: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { height: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 100, 300);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { height: arr } });
  }

  return cases;
}
