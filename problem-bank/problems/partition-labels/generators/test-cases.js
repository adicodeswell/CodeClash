import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "ababcbacadefegdehijhklij" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "eccbbbbdec" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abc" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char repeated " + i, inputs: { s: "z".repeat(5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Distinct letters " + i, inputs: { s: "abcdef" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const part1 = "a".repeat(randomInt(rng, 1, 3)) + "b".repeat(randomInt(rng, 1, 3));
    const part2 = "c".repeat(randomInt(rng, 1, 3)) + "d".repeat(randomInt(rng, 1, 3));
    cases.push({ category: "random", description: "Random two parts " + i, inputs: { s: part1 + part2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const letters = ["a", "b", "c", "d", "e"];
    let s = "";
    for (const l of letters) s += l.repeat(randomInt(rng, 2, 6));
    cases.push({ category: "large", description: "Large parts " + i, inputs: { s } });
  }

  return cases;
}
