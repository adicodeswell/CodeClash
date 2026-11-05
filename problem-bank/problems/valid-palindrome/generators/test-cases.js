import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "A_man,_a_plan,_a_canal:_Panama" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "race_a_car" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "0P" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "Two same", inputs: { s: "aa" } });
  cases.push({ category: "basic", description: "Two different", inputs: { s: "ab" } });
  cases.push({ category: "basic", description: "Punctuation only", inputs: { s: ",._-:" } });
  cases.push({ category: "basic", description: "Odd palindrome", inputs: { s: "aba" } });
  cases.push({ category: "basic", description: "Number palindrome", inputs: { s: "12321" } });
  cases.push({ category: "basic", description: "Mixed case", inputs: { s: "AbA" } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const isPal = i % 2 === 0;
    const len = (i % 6) + 3;
    let str = "";
    for (let j = 0; j < len; j++) str += String.fromCharCode(97 + (j % 5));
    if (isPal) {
      str = str + str.split("").reverse().join("");
    } else {
      str = str + "xyz";
    }
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s: str } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const isPal = i % 2 === 0;
    let s = "";
    for (let j = 0; j < 8; j++) {
      s += String.fromCharCode(65 + (j % 4)) + "_";
    }
    if (isPal) {
      s = s + s.split("").reverse().join("");
    } else {
      s = s + "Z_Q";
    }
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (40 - 64)
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.,-";
  for (let i = 40; i < 65; i++) {
    const isPal = i % 2 === 0;
    const halfLen = randomInt(rng, 5, 25);
    let half = "";
    for (let j = 0; j < halfLen; j++) half += alpha[randomInt(rng, 0, alpha.length - 1)];
    const s = isPal ? half + half.split("").reverse().join("") : half + "X9";
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const isPal = i % 2 === 0;
    const halfLen = randomInt(rng, 200, 600);
    let half = "";
    for (let j = 0; j < halfLen; j++) half += alpha[randomInt(rng, 0, alpha.length - 1)];
    const s = isPal ? half + half.split("").reverse().join("") : half + "X_diff_Z";
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}
