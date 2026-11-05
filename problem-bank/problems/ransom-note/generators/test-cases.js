import { randomInt } from "../../../scripts/utils/prng.js";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function randStr(rng, len) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += alphabet[randomInt(rng, 0, alphabet.length - 1)];
  }
  return s;
}

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { ransomNote: "a", magazine: "b" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { ransomNote: "aa", magazine: "ab" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { ransomNote: "aa", magazine: "aab" } });
  cases.push({ category: "basic", description: "Identical strings", inputs: { ransomNote: "abc", magazine: "abc" } });
  cases.push({ category: "basic", description: "Permutation match", inputs: { ransomNote: "cba", magazine: "abc" } });
  cases.push({ category: "basic", description: "Subset match", inputs: { ransomNote: "hello", magazine: "billionairehello" } });
  cases.push({ category: "basic", description: "Missing single letter", inputs: { ransomNote: "xyz", magazine: "xyw" } });
  cases.push({ category: "basic", description: "Repeated char insufficient", inputs: { ransomNote: "aaa", magazine: "aa" } });
  cases.push({ category: "basic", description: "Single matching char", inputs: { ransomNote: "z", magazine: "z" } });
  cases.push({ category: "basic", description: "Disjoint characters", inputs: { ransomNote: "ace", magazine: "bdf" } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = i - 9;
    const s = "a".repeat(len);
    const m = (i % 2 === 0) ? "a".repeat(len) : "a".repeat(len - 1) + "b";
    cases.push({
      category: "edge",
      description: `Repeated letter edge len=${len}`,
      inputs: { ransomNote: s, magazine: m }
    });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const mag = randStr(rng, 100);
    // Take substring or add extra char
    const r = (i % 2 === 0) ? mag.slice(0, 50) : mag.slice(0, 50) + "z";
    cases.push({
      category: "boundary",
      description: `Boundary substring test ${i}`,
      inputs: { ransomNote: r, magazine: mag }
    });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const mLen = randomInt(rng, 50, 200);
    const mag = randStr(rng, mLen);
    const rLen = randomInt(rng, 10, 40);
    const r = (i % 2 === 0)
      ? mag.split("").filter((_, idx) => idx % 3 === 0).join("").slice(0, rLen)
      : randStr(rng, rLen);
    cases.push({
      category: "random",
      description: `Random text test ${i}`,
      inputs: { ransomNote: r, magazine: mag }
    });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const mag = randStr(rng, 5000);
    const r = (i % 2 === 0) ? mag.slice(0, 2500) : mag.slice(0, 2500) + "{";
    cases.push({
      category: "stress",
      description: `Large string test ${i}`,
      inputs: { ransomNote: r.replace("{", "q"), magazine: mag }
    });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    const countA = 2000;
    const mag = "a".repeat(countA) + "b".repeat(countA);
    const r = (i % 2 === 0) ? "a".repeat(countA) : "a".repeat(countA + 1);
    cases.push({
      category: "adversarial",
      description: `Off-by-one counter test ${i}`,
      inputs: { ransomNote: r, magazine: mag }
    });
  }

  return cases;
}
