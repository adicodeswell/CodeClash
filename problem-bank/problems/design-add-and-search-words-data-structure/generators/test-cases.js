import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = "abcdefghijklmnopqrstuvwxyz";

function randomWord(rng, minLen, maxLen) {
  const len = randomInt(rng, minLen, maxLen);
  let res = "";
  for (let i = 0; i < len; i++) {
    res += letters[randomInt(rng, 0, letters.length - 1)];
  }
  return res;
}

function withDots(rng, word, maxDots = 2) {
  const chars = word.split("");
  const dotCount = Math.min(chars.length, randomInt(rng, 1, maxDots));
  for (let d = 0; d < dotCount; d++) {
    const idx = randomInt(rng, 0, chars.length - 1);
    chars[idx] = ".";
  }
  return chars.join("");
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["addWord", "addWord", "addWord", "search", "search", "search", "search"],
      words: ["bad", "dad", "mad", "pad", "bad", ".ad", "b.."]
    }
  });

  cases.push({
    category: "basic",
    description: "Exact match and wildcard",
    inputs: {
      operations: ["addWord", "search", "search"],
      words: ["cat", "cat", "c.t"]
    }
  });

  for (let i = 2; i < 10; i++) {
    const wordsPool = ["apple", "apply", "ample", "apron"];
    const ops = ["addWord", "addWord", "search", "search", "search"];
    const w = [wordsPool[0], wordsPool[1], "app..", "a.p.e", "banana"];
    cases.push({
      category: "basic",
      description: "Basic wildcard " + i,
      inputs: { operations: ops, words: w }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pool = [randomWord(rng, 2, 4), randomWord(rng, 3, 5)];
    const ops = ["addWord", "addWord"];
    const words = [pool[0], pool[1]];
    for (let j = 0; j < 8; j++) {
      ops.push("search");
      const base = pickRandom(rng, pool);
      words.push(rng() > 0.4 ? withDots(rng, base, 1) : randomWord(rng, 2, 4));
    }
    cases.push({
      category: "edge",
      description: "Edge case " + i,
      inputs: { operations: ops, words }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = ["addWord", "addWord", "addWord"];
    const w1 = randomWord(rng, 1, 2);
    const w2 = randomWord(rng, 1, 2);
    const words = [w1, w2, "z"];
    for (let j = 0; j < 6; j++) {
      ops.push("search");
      words.push(rng() > 0.5 ? "." : "a");
    }
    cases.push({
      category: "corner",
      description: "Corner single-char " + i,
      inputs: { operations: ops, words }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const words = [];
    const vocab = [];
    for (let v = 0; v < 6; v++) vocab.push(randomWord(rng, 3, 6));
    for (const v of vocab) {
      ops.push("addWord");
      words.push(v);
    }
    for (let j = 0; j < 15; j++) {
      ops.push("search");
      const base = pickRandom(rng, vocab);
      words.push(rng() > 0.3 ? withDots(rng, base, 2) : randomWord(rng, 3, 6));
    }
    cases.push({
      category: "random",
      description: "Random search " + i,
      inputs: { operations: ops, words }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const words = [];
    const vocab = [];
    for (let v = 0; v < 12; v++) vocab.push(randomWord(rng, 4, 8));
    for (const v of vocab) {
      ops.push("addWord");
      words.push(v);
    }
    for (let j = 0; j < 25; j++) {
      ops.push("search");
      const base = pickRandom(rng, vocab);
      words.push(rng() > 0.3 ? withDots(rng, base, 2) : randomWord(rng, 4, 8));
    }
    cases.push({
      category: "large",
      description: "Large search " + i,
      inputs: { operations: ops, words }
    });
  }

  return cases;
}
