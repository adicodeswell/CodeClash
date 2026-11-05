import { randomInt, pickRandom, shuffle } from "../../../scripts/utils/prng.js";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { words: ["wrt","wrf","er","ett","rftt"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { words: ["z","x"] } });
  cases.push({ category: "basic", description: "Single word", inputs: { words: ["abc"] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { words: ["ab", "ac", "ba"] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "One char words " + i, inputs: { words: ["a", "b", "c"] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Prefix words " + i, inputs: { words: ["x", "xy", "xyz"] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const letters = alphabet.slice(0, 4).split("");
    shuffle(rng, letters);
    const orderMap = new Map();
    letters.forEach((l, idx) => orderMap.set(l, idx));

    const wList = ["a", "b", "c", "d"].sort((a, b) => orderMap.get(a) - orderMap.get(b));
    cases.push({ category: "random", description: "Random order " + i, inputs: { words: wList } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const letters = alphabet.slice(0, 6).split("");
    shuffle(rng, letters);
    const orderMap = new Map();
    letters.forEach((l, idx) => orderMap.set(l, idx));

    const pool = ["ab", "ac", "ba", "bc", "ca", "cb"].sort((w1, w2) => {
      for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
        if (w1[j] !== w2[j]) return orderMap.get(w1[j]) - orderMap.get(w2[j]);
      }
      return w1.length - w2.length;
    });
    cases.push({ category: "large", description: "Large words " + i, inputs: { words: pool } });
  }

  return cases;
}
