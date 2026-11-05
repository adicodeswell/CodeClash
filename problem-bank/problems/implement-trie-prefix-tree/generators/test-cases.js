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

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["insert", "search", "search", "startsWith", "insert", "search"],
      words: ["apple", "apple", "app", "app", "app", "app"]
    }
  });

  cases.push({
    category: "basic",
    description: "Single insert and search",
    inputs: {
      operations: ["insert", "search", "startsWith"],
      words: ["codeclash", "codeclash", "code"]
    }
  });

  cases.push({
    category: "basic",
    description: "Missing prefix",
    inputs: {
      operations: ["insert", "search", "startsWith"],
      words: ["cat", "dog", "do"]
    }
  });

  cases.push({
    category: "basic",
    description: "Prefix exists but not full word",
    inputs: {
      operations: ["insert", "search", "startsWith"],
      words: ["banana", "ban", "ban"]
    }
  });

  for (let i = 4; i < 10; i++) {
    const ops = ["insert", "insert", "search", "startsWith", "search"];
    const w1 = randomWord(rng, 3, 5);
    const w2 = w1 + randomWord(rng, 1, 3);
    const words = [w1, w2, w1, w1.slice(0, 2), "xyz"];
    cases.push({
      category: "basic",
      description: "Basic combo " + i,
      inputs: { operations: ops, words }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pool = [randomWord(rng, 2, 4), randomWord(rng, 3, 6)];
    const ops = [];
    const words = [];
    const count = 10 + (i % 5);
    for (let j = 0; j < count; j++) {
      const type = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(type);
      const base = pickRandom(rng, pool);
      if (type === "startsWith") {
        words.push(base.slice(0, randomInt(rng, 1, base.length)));
      } else {
        words.push(rng() > 0.5 ? base : randomWord(rng, 2, 5));
      }
    }
    cases.push({
      category: "edge",
      description: "Edge case " + i,
      inputs: { operations: ops, words }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = [];
    const words = [];
    for (let j = 0; j < 15; j++) {
      const op = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(op);
      words.push(randomWord(rng, 1, 2));
    }
    cases.push({
      category: "corner",
      description: "Corner short words " + i,
      inputs: { operations: ops, words }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const words = [];
    const vocabulary = [];
    for (let v = 0; v < 8; v++) vocabulary.push(randomWord(rng, 3, 8));
    for (let j = 0; j < 25; j++) {
      const op = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(op);
      const chosen = pickRandom(rng, vocabulary);
      if (op === "startsWith") {
        words.push(chosen.slice(0, randomInt(rng, 1, chosen.length)));
      } else {
        words.push(chosen);
      }
    }
    cases.push({
      category: "random",
      description: "Random test " + i,
      inputs: { operations: ops, words }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const words = [];
    const vocabulary = [];
    for (let v = 0; v < 15; v++) vocabulary.push(randomWord(rng, 4, 10));
    for (let j = 0; j < 40; j++) {
      const op = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(op);
      const chosen = pickRandom(rng, vocabulary);
      if (op === "startsWith") {
        words.push(chosen.slice(0, randomInt(rng, 1, chosen.length)));
      } else {
        words.push(chosen);
      }
    }
    cases.push({
      category: "large",
      description: "Large test " + i,
      inputs: { operations: ops, words }
    });
  }

  return cases;
}
