import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "codeclash", wordDict: ["code", "clash"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "applepenapple", wordDict: ["apple", "pen"] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aaaa", wordDict: ["a", "aa"] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char match " + i, inputs: { s: "a", wordDict: ["a"] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single char mismatch " + i, inputs: { s: "b", wordDict: ["a"] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const vocab = ["code", "clash", "fast", "algo"];
    const w1 = pickRandom(rng, vocab);
    const w2 = pickRandom(rng, vocab);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: w1 + w2, wordDict: vocab } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const vocab = ["apple", "banana", "orange", "grape"];
    let s = "";
    for (let k = 0; k < 5; k++) s += pickRandom(rng, vocab);
    cases.push({ category: "large", description: "Large " + i, inputs: { s, wordDict: vocab } });
  }

  return cases;
}
