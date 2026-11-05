import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s1: "aabcc", s2: "dbbca", s3: "aadbbcbcac" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s1: "aabcc", s2: "dbbca", s3: "aadbbbaccc" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s1: "a", s2: "b", s3: "ab" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s1: "aa", s2: "ab", s3: "aaba" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char each " + i, inputs: { s1: "x", s2: "y", s3: "xy" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Length mismatch " + i, inputs: { s1: "abc", s2: "def", s3: "ab" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let s1 = "", s2 = "", s3 = "";
    for (let j = 0; j < 5; j++) s1 += pickRandom(rng, ["a", "b"]);
    for (let j = 0; j < 5; j++) s2 += pickRandom(rng, ["c", "d"]);
    // build valid s3
    let p1 = 0, p2 = 0;
    while (p1 < s1.length || p2 < s2.length) {
      if (p1 < s1.length && (p2 === s2.length || rng() > 0.5)) s3 += s1[p1++];
      else s3 += s2[p2++];
    }
    cases.push({ category: "random", description: "Random valid " + i, inputs: { s1, s2, s3 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let s1 = "", s2 = "", s3 = "";
    for (let j = 0; j < 15; j++) s1 += pickRandom(rng, ["a", "b"]);
    for (let j = 0; j < 15; j++) s2 += pickRandom(rng, ["a", "b"]);
    let p1 = 0, p2 = 0;
    while (p1 < s1.length || p2 < s2.length) {
      if (p1 < s1.length && (p2 === s2.length || rng() > 0.5)) s3 += s1[p1++];
      else s3 += s2[p2++];
    }
    cases.push({ category: "large", description: "Large valid " + i, inputs: { s1, s2, s3 } });
  }

  return cases;
}
