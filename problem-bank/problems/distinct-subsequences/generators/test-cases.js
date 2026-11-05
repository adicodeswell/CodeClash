import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "rabbbit", t: "rabbit" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "babgbag", t: "bag" } });
  cases.push({ category: "basic", description: "Identical strings", inputs: { s: "abc", t: "abc" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aaaa", t: "aa" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char " + i, inputs: { s: "a", t: "a" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "t longer than s " + i, inputs: { s: "a", t: "aa" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let s = "";
    for (let j = 0; j < 12; j++) s += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s, t: "ab" } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let s = "";
    for (let j = 0; j < 30; j++) s += pickRandom(rng, ["a", "b"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s, t: "aab" } });
  }

  return cases;
}
