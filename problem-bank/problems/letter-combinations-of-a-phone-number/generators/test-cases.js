import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const digitPool = ["2", "3", "4", "5", "6", "7", "8", "9"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { digits: "23" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { digits: "2" } });
  cases.push({ category: "basic", description: "Two 7s", inputs: { digits: "77" } });
  cases.push({ category: "basic", description: "Three digits", inputs: { digits: "234" } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { digits: pickRandom(rng, digitPool) + pickRandom(rng, digitPool) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single digit " + i, inputs: { digits: pickRandom(rng, digitPool) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Repeated " + i, inputs: { digits: "99" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let str = "";
    for (let j = 0; j < 3; j++) str += pickRandom(rng, digitPool);
    cases.push({ category: "random", description: "Random 3-digit " + i, inputs: { digits: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let str = "";
    for (let j = 0; j < 4; j++) str += pickRandom(rng, digitPool);
    cases.push({ category: "large", description: "Large 4-digit " + i, inputs: { digits: str } });
  }

  return cases;
}
