import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "ABAB", k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "AABABBA", k: 1 } });
  cases.push({ category: "basic", description: "k=0", inputs: { s: "ABBB", k: 0 } });
  cases.push({ category: "basic", description: "All same", inputs: { s: "AAAA", k: 2 } });
  cases.push({ category: "basic", description: "k >= len", inputs: { s: "ABCD", k: 4 } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "X", k: 0 } });
  cases.push({ category: "basic", description: "Alternating with k=1", inputs: { s: "ABABAB", k: 1 } });
  cases.push({ category: "basic", description: "Two different blocks", inputs: { s: "AAABBB", k: 1 } });
  cases.push({ category: "basic", description: "Three distinct", inputs: { s: "ABCDE", k: 2 } });
  cases.push({ category: "basic", description: "Dense cluster", inputs: { s: "BAAAB", k: 2 } });

  function makeStr(len, alphabetSize) {
    let s = "";
    for (let i = 0; i < len; i++) s += String.fromCharCode(65 + (i % alphabetSize));
    return s;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const k = i % 3;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s: makeStr(len, 3), k } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const k = (i % 4) + 1;
    let s = "";
    for (let j = 0; j < len; j++) s += String.fromCharCode(65 + randomInt(rng, 0, 3));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s, k } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const k = randomInt(rng, 0, 5);
    let s = "";
    for (let j = 0; j < len; j++) s += String.fromCharCode(65 + randomInt(rng, 0, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const k = randomInt(rng, 1, 10);
    let s = "";
    for (let j = 0; j < len; j++) s += String.fromCharCode(65 + randomInt(rng, 0, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k } });
  }

  return cases;
}
