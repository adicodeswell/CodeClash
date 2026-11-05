import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aaa" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aba" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char " + i, inputs: { s: "x" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Identical chars " + i, inputs: { s: "b".repeat(4 + (i % 4)) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let str = "";
    for (let j = 0; j < 12; j++) str += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let str = "";
    for (let j = 0; j < 30; j++) str += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: str } });
  }

  return cases;
}
