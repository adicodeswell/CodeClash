import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "ADOBECODEBANC", t: "ABC" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "a", t: "a" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "aabccba", t: "abc" } });
  cases.push({ category: "basic", description: "Exact same", inputs: { s: "ABC", t: "ABC" } });
  cases.push({ category: "basic", description: "Duplicates in t", inputs: { s: "AAABBBCCC", t: "AABC" } });
  cases.push({ category: "basic", description: "Window at end", inputs: { s: "ZZZZZABC", t: "ABC" } });
  cases.push({ category: "basic", description: "Window at start", inputs: { s: "ABCZZZZZ", t: "ABC" } });
  cases.push({ category: "basic", description: "Interleaved chars", inputs: { s: "AxBxCxDxEx", t: "ABC" } });
  cases.push({ category: "basic", description: "Case sensitivity", inputs: { s: "aAbBcC", t: "aB" } });
  cases.push({ category: "basic", description: "Single char repeated", inputs: { s: "aaaaaa", t: "aa" } });

  function makeCase(sLen, tLen) {
    let t = "";
    for (let i = 0; i < tLen; i++) t += String.fromCharCode(65 + randomInt(rng, 0, 4));
    let s = "";
    for (let i = 0; i < sLen; i++) s += String.fromCharCode(65 + randomInt(rng, 5, 8));
    // Embed t into s at random locations so a window always exists
    const tChars = shuffle(rng, t.split(""));
    const embedPositions = [];
    while (embedPositions.length < tLen) {
      const pos = randomInt(rng, 0, sLen - 1);
      if (!embedPositions.includes(pos)) embedPositions.push(pos);
    }
    embedPositions.sort((a, b) => a - b);
    const sArr = s.split("");
    for (let i = 0; i < tLen; i++) {
      sArr[embedPositions[i]] = tChars[i];
    }
    return { s: sArr.join(""), t };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const c = makeCase(8 + (i % 4), 2 + (i % 2));
    cases.push({ category: "edge", description: "Edge " + i, inputs: c });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const c = makeCase(15, 3);
    cases.push({ category: "corner", description: "Corner " + i, inputs: c });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const c = makeCase(randomInt(rng, 25, 50), randomInt(rng, 2, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: c });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const c = makeCase(randomInt(rng, 70, 150), randomInt(rng, 3, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: c });
  }

  return cases;
}
