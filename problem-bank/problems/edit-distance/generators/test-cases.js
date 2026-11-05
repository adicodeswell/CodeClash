import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = ["a", "b", "c", "d"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { word1: "horse", word2: "ros" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { word1: "intention", word2: "execution" } });
  cases.push({ category: "basic", description: "Identical", inputs: { word1: "abc", word2: "abc" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { word1: "cat", word2: "hat" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char diff " + i, inputs: { word1: "a", word2: "b" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Length difference " + i, inputs: { word1: "abc", word2: "a" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let w1 = "", w2 = "";
    for (let j = 0; j < 8; j++) w1 += pickRandom(rng, letters);
    for (let j = 0; j < 8; j++) w2 += pickRandom(rng, letters);
    cases.push({ category: "random", description: "Random " + i, inputs: { word1: w1, word2: w2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let w1 = "", w2 = "";
    for (let j = 0; j < 25; j++) w1 += pickRandom(rng, letters);
    for (let j = 0; j < 25; j++) w2 += pickRandom(rng, letters);
    cases.push({ category: "large", description: "Large " + i, inputs: { word1: w1, word2: w2 } });
  }

  return cases;
}
