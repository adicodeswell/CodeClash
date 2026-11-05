import { randomInt } from "../../../scripts/utils/prng.js";

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abccccdd" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "All distinct chars", inputs: { s: "abcdef" } });
  cases.push({ category: "basic", description: "All identical", inputs: { s: "aaaaaa" } });
  cases.push({ category: "basic", description: "Case sensitive check", inputs: { s: "AaBbCc" } });
  cases.push({ category: "basic", description: "Pairs only", inputs: { s: "aabbcc" } });
  cases.push({ category: "basic", description: "Odd pairs", inputs: { s: "aaabbb" } });
  cases.push({ category: "basic", description: "Single char pairs", inputs: { s: "cc" } });
  cases.push({ category: "basic", description: "Mixed case pair", inputs: { s: "Aabb" } });
  cases.push({ category: "basic", description: "Palindromic word", inputs: { s: "racecar" } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const ch = chars[i % chars.length];
    const s = ch.repeat(i - 8);
    cases.push({ category: "edge", description: `Single repeating char length ${i - 8}`, inputs: { s } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    let s = "";
    for (let j = 0; j < i; j++) {
      s += chars[j % 10];
    }
    cases.push({ category: "boundary", description: `Boundary pattern length ${i}`, inputs: { s } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const len = randomInt(rng, 20, 100);
    let s = "";
    for (let j = 0; j < len; j++) {
      s += chars[randomInt(rng, 0, chars.length - 1)];
    }
    cases.push({ category: "random", description: `Random string length ${len}`, inputs: { s } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const len = 2000;
    let s = "";
    for (let j = 0; j < len; j++) {
      s += chars[randomInt(rng, 0, chars.length - 1)];
    }
    cases.push({ category: "stress", description: `Stress max constraint length 2000`, inputs: { s } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    // String with 1 occurrence of 50 chars, and 2 occurrences of 20 chars
    let s = "";
    for (let j = 0; j < 40; j++) s += chars[j];
    for (let j = 0; j < 10; j++) s += chars[j].repeat(4);
    cases.push({ category: "adversarial", description: `Adversarial parity test ${i}`, inputs: { s } });
  }

  return cases;
}
