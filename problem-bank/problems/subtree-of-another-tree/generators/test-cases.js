import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "4", "5", "1", "2"], subRoot: ["4", "1", "2"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["3", "4", "5", "1", "2", "null", "null", "null", "null", "0"], subRoot: ["4", "1", "2"] } });
  cases.push({ category: "basic", description: "Self subtree", inputs: { root: ["1", "2", "3"], subRoot: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Single node hit", inputs: { root: ["1", "2", "3"], subRoot: ["3"] } });
  cases.push({ category: "basic", description: "Single node miss", inputs: { root: ["1", "2", "3"], subRoot: ["4"] } });
  cases.push({ category: "basic", description: "Left leaf hit", inputs: { root: ["1", "2", "null", "4"], subRoot: ["4"] } });
  cases.push({ category: "basic", description: "Left leaf miss", inputs: { root: ["1", "2", "null", "4"], subRoot: ["2"] } });
  cases.push({ category: "basic", description: "Right subtree hit", inputs: { root: ["1", "2", "3", "null", "null", "6", "7"], subRoot: ["3", "6", "7"] } });
  cases.push({ category: "basic", description: "Different root", inputs: { root: ["1", "1"], subRoot: ["1"] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { root: ["-1", "-2", "-3"], subRoot: ["-2"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 20))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 3) === 0 ? "null" : String(randomInt(rng, 1, 20)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(4 + (i % 4));
    const s = isSub ? [r[0]] : ["99"];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: r, subRoot: s } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(8);
    const s = isSub ? [r[0]] : ["100"];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: r, subRoot: s } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(randomInt(rng, 10, 20));
    const s = isSub ? [r[0]] : ["100"];
    cases.push({ category: "random", description: "Random " + i, inputs: { root: r, subRoot: s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(randomInt(rng, 20, 35));
    const s = isSub ? [r[0]] : ["100"];
    cases.push({ category: "large", description: "Large " + i, inputs: { root: r, subRoot: s } });
  }

  return cases;
}
