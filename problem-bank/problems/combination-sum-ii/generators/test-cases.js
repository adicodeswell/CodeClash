import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { candidates: [10, 1, 2, 7, 6, 1, 5], target: 8 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { candidates: [2, 5, 2, 1, 2], target: 5 } });
  cases.push({ category: "basic", description: "Exact single", inputs: { candidates: [3, 4], target: 3 } });

  for (let i = 3; i < 10; i++) {
    const cands = [1, 1, 2, 3, 4];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { candidates: cands, target: 4 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const v = randomInt(rng, 1, 5);
    cases.push({ category: "edge", description: "Repeated elements " + i, inputs: { candidates: [v, v, v, v], target: v * 2 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const v = randomInt(rng, 2, 6);
    cases.push({ category: "corner", description: "Pair sum " + i, inputs: { candidates: [1, v, v + 2], target: v + 1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const cands = [1, 2, 2, 3, 4, 5];
    const target = randomInt(rng, 4, 9);
    cases.push({ category: "random", description: "Random " + i, inputs: { candidates: cands, target } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const cands = [1, 1, 2, 2, 3, 3, 4, 5];
    const target = randomInt(rng, 5, 10);
    cases.push({ category: "large", description: "Large " + i, inputs: { candidates: cands, target } });
  }

  return cases;
}
