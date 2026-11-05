import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abcabcbb" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "bbbbb" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "pwwkew" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "All unique", inputs: { s: "abcdefg" } });
  cases.push({ category: "basic", description: "Two chars alternating", inputs: { s: "abababab" } });
  cases.push({ category: "basic", description: "Numbers", inputs: { s: "123456789" } });
  cases.push({ category: "basic", description: "Symbols", inputs: { s: "!@#$%^&*()" } });
  cases.push({ category: "basic", description: "Sandwich", inputs: { s: "abccba" } });
  cases.push({ category: "basic", description: "Duplicate at ends", inputs: { s: "a12345a" } });

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-.,";

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 6);
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, 5)];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, 10)];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, 25)];
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, chars.length - 1)];
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}
