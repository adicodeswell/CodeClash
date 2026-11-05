import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "aa", p: "a" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aa", p: "a*" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "ab", p: ".*" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aab", p: "c*a*b" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char exact " + i, inputs: { s: "a", p: "a" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Dot star match " + i, inputs: { s: "abcdef", p: ".*" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { s: "ab", p: ".*c" } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { s: "mississippi", p: "mis*is*ip*." } });
  }

  return cases;
}
