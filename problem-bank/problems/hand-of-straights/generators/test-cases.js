import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { hand: [1, 2, 3, 6, 2, 3, 4, 7, 8], groupSize: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { hand: [1, 2, 3, 4, 5], groupSize: 4 } });
  cases.push({ category: "basic", description: "groupSize = 1", inputs: { hand: [5, 1, 9], groupSize: 1 } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { hand: [1, 2, 3, 4, 5, 6], groupSize: 3 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single group " + i, inputs: { hand: [10, 11, 12], groupSize: 3 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Length not divisible " + i, inputs: { hand: [1, 2, 3, 4], groupSize: 3 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const hand = [];
    for (let g = 0; g < 3; g++) {
      const start = randomInt(rng, 1, 20);
      for (let j = 0; j < 3; j++) hand.push(start + j);
    }
    shuffle(rng, hand);
    cases.push({ category: "random", description: "Random valid " + i, inputs: { hand, groupSize: 3 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const hand = [];
    for (let g = 0; g < 6; g++) {
      const start = randomInt(rng, 1, 50);
      for (let j = 0; j < 4; j++) hand.push(start + j);
    }
    shuffle(rng, hand);
    cases.push({ category: "large", description: "Large valid " + i, inputs: { hand, groupSize: 4 } });
  }

  return cases;
}
