import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "12" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "226" } });
  cases.push({ category: "basic", description: "Example 3 (starts with 0)", inputs: { s: "06" } });
  cases.push({ category: "basic", description: "Single digit non-zero", inputs: { s: "7" } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "111" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single zero " + i, inputs: { s: "0" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Ending zero " + i, inputs: { s: "10" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let str = pickRandom(rng, ["1", "2", "3"]);
    for (let j = 0; j < 8; j++) str += pickRandom(rng, ["0", "1", "2", "3", "4", "5", "6"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let str = pickRandom(rng, ["1", "2"]);
    for (let j = 0; j < 20; j++) str += pickRandom(rng, ["1", "2", "3", "4"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: str } });
  }

  return cases;
}
