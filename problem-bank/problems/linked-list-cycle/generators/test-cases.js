import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [3, 2, 0, -4], pos: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2], pos: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { head: [1], pos: -1 } });
  cases.push({ category: "basic", description: "Self loop", inputs: { head: [5], pos: 0 } });
  cases.push({ category: "basic", description: "No loop two", inputs: { head: [1, 2], pos: -1 } });
  cases.push({ category: "basic", description: "Cycle to tail", inputs: { head: [1, 2, 3], pos: 2 } });
  cases.push({ category: "basic", description: "Cycle to head", inputs: { head: [1, 2, 3, 4], pos: 0 } });
  cases.push({ category: "basic", description: "Long no cycle", inputs: { head: [1, 2, 3, 4, 5], pos: -1 } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { head: [-1, -2, -3], pos: 1 } });
  cases.push({ category: "basic", description: "Equal elements", inputs: { head: [2, 2, 2], pos: -1 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const hasCycle = i % 2 === 0;
    const len = 2 + (i % 5);
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -50, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr, pos } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const hasCycle = i % 2 === 0;
    const len = 12;
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr, pos } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const hasCycle = i % 2 === 0;
    const len = randomInt(rng, 10, 30);
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr, pos } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const hasCycle = i % 2 === 0;
    const len = randomInt(rng, 50, 150);
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr, pos } });
  }

  return cases;
}
