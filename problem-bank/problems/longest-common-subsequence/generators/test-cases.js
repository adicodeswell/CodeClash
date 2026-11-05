import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = ["a", "b", "c", "d", "e"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { text1: "abcde", text2: "ace" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { text1: "abc", text2: "abc" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { text1: "abc", text2: "def" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { text1: "abacaba", text2: "baab" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char match " + i, inputs: { text1: "a", text2: "a" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single char mismatch " + i, inputs: { text1: "a", text2: "b" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let t1 = "", t2 = "";
    for (let j = 0; j < 15; j++) t1 += pickRandom(rng, letters);
    for (let j = 0; j < 15; j++) t2 += pickRandom(rng, letters);
    cases.push({ category: "random", description: "Random " + i, inputs: { text1: t1, text2: t2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let t1 = "", t2 = "";
    for (let j = 0; j < 40; j++) t1 += pickRandom(rng, letters);
    for (let j = 0; j < 40; j++) t2 += pickRandom(rng, letters);
    cases.push({ category: "large", description: "Large " + i, inputs: { text1: t1, text2: t2 } });
  }

  return cases;
}
