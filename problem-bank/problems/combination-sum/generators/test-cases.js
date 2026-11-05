import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { candidates: [2, 3, 6, 7], target: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { candidates: [2, 3, 5], target: 8 } });
  cases.push({ category: "basic", description: "Single candidate equal to target", inputs: { candidates: [2], target: 2 } });
  cases.push({ category: "basic", description: "Two candidates", inputs: { candidates: [2, 3], target: 6 } });

  for (let i = 4; i < 10; i++) {
    const cands = [2, 3, 4 + (i % 3)];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { candidates: cands, target: 6 + (i % 4) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const c = randomInt(rng, 2, 6);
    const mult = randomInt(rng, 1, 3);
    cases.push({ category: "edge", description: "Exact multiple " + i, inputs: { candidates: [c, c + 3], target: c * mult } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const c = randomInt(rng, 3, 8);
    cases.push({ category: "corner", description: "Single match " + i, inputs: { candidates: [c], target: c } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const base = [2, 3, 5];
    const target = randomInt(rng, 6, 15);
    cases.push({ category: "random", description: "Random " + i, inputs: { candidates: base, target } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const cands = [2, 3, 4, 7];
    const target = randomInt(rng, 10, 18);
    cases.push({ category: "large", description: "Large target " + i, inputs: { candidates: cands, target } });
  }

  return cases;
}
