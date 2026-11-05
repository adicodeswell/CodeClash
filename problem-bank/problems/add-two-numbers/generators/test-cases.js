import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { l1: [2, 4, 3], l2: [5, 6, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { l1: [0], l2: [0] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] } });
  cases.push({ category: "basic", description: "Carry over 1", inputs: { l1: [5], l2: [5] } });
  cases.push({ category: "basic", description: "No carry", inputs: { l1: [1, 2], l2: [3, 4] } });
  cases.push({ category: "basic", description: "Single vs multi", inputs: { l1: [1], l2: [9, 9] } });
  cases.push({ category: "basic", description: "Carry ripple", inputs: { l1: [9], l2: [9, 9, 9] } });
  cases.push({ category: "basic", description: "Zeros present", inputs: { l1: [0, 1], l2: [0, 2] } });
  cases.push({ category: "basic", description: "Different lengths", inputs: { l1: [1, 2, 3], l2: [4] } });
  cases.push({ category: "basic", description: "Nine chain", inputs: { l1: [9, 9], l2: [1] } });

  function makeNumber(len) {
    const digits = [];
    for (let i = 0; i < len; i++) {
      digits.push(i === len - 1 && len > 1 ? randomInt(rng, 1, 9) : randomInt(rng, 0, 9));
    }
    return digits;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { l1: makeNumber(1 + (i % 4)), l2: makeNumber(1 + ((i + 1) % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { l1: makeNumber(8), l2: makeNumber(5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { l1: makeNumber(randomInt(rng, 5, 20)), l2: makeNumber(randomInt(rng, 5, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { l1: makeNumber(randomInt(rng, 25, 50)), l2: makeNumber(randomInt(rng, 25, 50)) } });
  }

  return cases;
}
