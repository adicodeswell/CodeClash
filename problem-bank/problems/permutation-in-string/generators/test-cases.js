import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s1: "ab", s2: "eidbaooo" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s1: "ab", s2: "eidboaoo" } });
  cases.push({ category: "basic", description: "Exact match", inputs: { s1: "abc", s2: "abc" } });
  cases.push({ category: "basic", description: "Reversed match", inputs: { s1: "abc", s2: "cba" } });
  cases.push({ category: "basic", description: "Single char match", inputs: { s1: "a", s2: "a" } });
  cases.push({ category: "basic", description: "Single char fail", inputs: { s1: "a", s2: "b" } });
  cases.push({ category: "basic", description: "Longer s1", inputs: { s1: "abcd", s2: "abc" } });
  cases.push({ category: "basic", description: "Permutation at start", inputs: { s1: "xyz", s2: "zyxabc" } });
  cases.push({ category: "basic", description: "Permutation at end", inputs: { s1: "xyz", s2: "abczyx" } });
  cases.push({ category: "basic", description: "All same letters", inputs: { s1: "aaa", s2: "baaa" } });

  function makeCase(len1, len2, shouldMatch) {
    let s1 = "";
    for (let i = 0; i < len1; i++) s1 += String.fromCharCode(97 + randomInt(rng, 0, 4));
    let s2 = "";
    for (let i = 0; i < len2; i++) s2 += String.fromCharCode(97 + randomInt(rng, 5, 9));
    if (shouldMatch) {
      const perm = shuffle(rng, s1.split("")).join("");
      const insertPos = randomInt(rng, 0, Math.max(0, len2 - len1));
      s2 = s2.slice(0, insertPos) + perm + s2.slice(insertPos);
    }
    return { s1, s2 };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const match = i % 2 === 0;
    const c = makeCase(2 + (i % 3), 6 + (i % 4), match);
    cases.push({ category: "edge", description: "Edge " + i, inputs: c });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const match = i % 2 === 0;
    const c = makeCase(4, 15, match);
    cases.push({ category: "corner", description: "Corner " + i, inputs: c });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const match = i % 2 === 0;
    const c = makeCase(randomInt(rng, 3, 6), randomInt(rng, 20, 50), match);
    cases.push({ category: "random", description: "Random " + i, inputs: c });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const match = i % 2 === 0;
    const c = makeCase(randomInt(rng, 5, 10), randomInt(rng, 80, 200), match);
    cases.push({ category: "large", description: "Large " + i, inputs: c });
  }

  return cases;
}
