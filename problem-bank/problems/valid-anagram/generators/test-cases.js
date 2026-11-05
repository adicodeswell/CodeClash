import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "anagram", t: "nagaram" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "rat", t: "car" } });
  cases.push({ category: "basic", description: "Single char match", inputs: { s: "a", t: "a" } });
  cases.push({ category: "basic", description: "Single char mismatch", inputs: { s: "a", t: "b" } });
  cases.push({ category: "basic", description: "Different lengths", inputs: { s: "ab", t: "a" } });
  cases.push({ category: "basic", description: "Reverse word", inputs: { s: "stop", t: "pots" } });
  cases.push({ category: "basic", description: "Same repeated char", inputs: { s: "aaaa", t: "aaaa" } });
  cases.push({ category: "basic", description: "Repeated char mismatch", inputs: { s: "aaa", t: "aaaa" } });
  cases.push({ category: "basic", description: "Two chars flipped", inputs: { s: "ba", t: "ab" } });
  cases.push({ category: "basic", description: "One char different in middle", inputs: { s: "coding", t: "codeng" } });

  const letters = "abcdefghijklmnopqrstuvwxyz";

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = (i % 6) + 2;
    const chars = [];
    for (let j = 0; j < len; j++) chars.push(letters[j % 26]);
    const s = chars.join("");
    const t = (i % 2 === 0) ? shuffle(rng, chars).join("") : chars.slice(1).concat("z").join("");
    cases.push({
      category: "edge",
      description: `Edge case len=${len}`,
      inputs: { s, t }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 30;
    const chars = [];
    for (let j = 0; j < len; j++) chars.push(letters[randomInt(rng, 0, 5)]);
    const s = chars.join("");
    let t;
    if (i % 2 === 0) {
      t = shuffle(rng, chars).join("");
    } else {
      const copy = [...chars];
      copy[0] = copy[0] === "a" ? "b" : "a";
      t = shuffle(rng, copy).join("");
    }
    cases.push({
      category: "corner",
      description: `Corner case len=${len}`,
      inputs: { s, t }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 40, 150);
    const chars = [];
    for (let j = 0; j < len; j++) chars.push(letters[randomInt(rng, 0, 25)]);
    const s = chars.join("");
    let t;
    if (i % 2 === 0) {
      t = shuffle(rng, chars).join("");
    } else {
      const copy = [...chars];
      copy[randomInt(rng, 0, len - 1)] = letters[randomInt(rng, 0, 25)];
      t = shuffle(rng, copy).join("");
    }
    cases.push({
      category: "random",
      description: `Random string len=${len}`,
      inputs: { s, t }
    });
  }

  // Stress (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 3000;
    const chars = [];
    for (let j = 0; j < len; j++) chars.push(letters[randomInt(rng, 0, 25)]);
    const s = chars.join("");
    const t = (i % 2 === 0) ? shuffle(rng, chars).join("") : s.slice(1) + "x";
    cases.push({
      category: "stress",
      description: `Stress len=${len}`,
      inputs: { s, t }
    });
  }

  return cases;
}
