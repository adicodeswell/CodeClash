import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2, 3, 4, 5], k: 3 } });
  cases.push({ category: "basic", description: "k=1", inputs: { head: [1, 2, 3, 4], k: 1 } });
  cases.push({ category: "basic", description: "k=n", inputs: { head: [1, 2, 3], k: 3 } });
  cases.push({ category: "basic", description: "Exact multiple", inputs: { head: [1, 2, 3, 4], k: 2 } });
  cases.push({ category: "basic", description: "Single element", inputs: { head: [42], k: 1 } });
  cases.push({ category: "basic", description: "Even length k=2", inputs: { head: [10, 20, 30, 40], k: 2 } });
  cases.push({ category: "basic", description: "Remainder 1", inputs: { head: [1, 2, 3, 4, 5, 6, 7], k: 3 } });
  cases.push({ category: "basic", description: "All equal", inputs: { head: [5, 5, 5, 5, 5], k: 2 } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [5, 4, 3, 2, 1], k: 2 } });

  function makeCase(n, k) {
    const arr = [];
    for (let i = 0; i < n; i++) arr.push(randomInt(rng, 1, 100));
    return { head: arr, k };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 5);
    const k = 1 + (i % len);
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(len, k) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const k = 2 + (i % 4);
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(len, k) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 30);
    const k = randomInt(rng, 1, Math.min(8, len));
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(len, k) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 40, 100);
    const k = randomInt(rng, 2, 10);
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(len, k) });
  }

  return cases;
}
