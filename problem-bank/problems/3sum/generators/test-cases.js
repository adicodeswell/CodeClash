import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [-1, 0, 1, 2, -1, -4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 1, -1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [-2, 0, 1, 1, 2] } });
  cases.push({ category: "basic", description: "Three zeros", inputs: { nums: [0, 0, 0] } });
  cases.push({ category: "basic", description: "Four zeros", inputs: { nums: [0, 0, 0, 0] } });
  cases.push({ category: "basic", description: "Symmetric", inputs: { nums: [-3, -1, 0, 1, 3] } });
  cases.push({ category: "basic", description: "Small set", inputs: { nums: [-1, -1, 2, -2, 4] } });
  cases.push({ category: "basic", description: "Duplicates", inputs: { nums: [-2, -2, 0, 2, 2] } });
  cases.push({ category: "basic", description: "Single pair with zero", inputs: { nums: [-5, 0, 5, 10] } });
  cases.push({ category: "basic", description: "Two triplets", inputs: { nums: [-1, 0, 1, -2, 2] } });

  function makeCaseWithTriplet(len, minVal, maxVal) {
    const a = randomInt(rng, 1, 20);
    const b = randomInt(rng, 1, 20);
    const arr = [-a, -b, a + b];
    while (arr.length < len) {
      arr.push(randomInt(rng, minVal, maxVal));
    }
    return shuffle(rng, arr);
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums: makeCaseWithTriplet(6 + (i % 4), -10, 10) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: makeCaseWithTriplet(12, -30, 30) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: makeCaseWithTriplet(randomInt(rng, 20, 50), -100, 100) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: makeCaseWithTriplet(randomInt(rng, 60, 120), -500, 500) } });
  }

  return cases;
}
