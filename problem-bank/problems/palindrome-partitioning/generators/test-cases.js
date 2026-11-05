import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "aab" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "All distinct", inputs: { s: "abc" } });
  cases.push({ category: "basic", description: "Palindrome word", inputs: { s: "aba" } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abba" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char " + i, inputs: { s: "z" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const count = 3 + (i % 3);
    cases.push({ category: "corner", description: "All same " + i, inputs: { s: "a".repeat(count) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const chars = ["a", "b", "c"];
    let str = "";
    for (let j = 0; j < 5; j++) str += pickRandom(rng, chars);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const chars = ["a", "b", "c"];
    let str = "";
    for (let j = 0; j < 7; j++) str += pickRandom(rng, chars);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: str } });
  }

  return cases;
}
