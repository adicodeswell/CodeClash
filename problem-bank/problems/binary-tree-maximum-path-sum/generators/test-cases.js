import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["-10", "9", "20", "null", "null", "15", "7"] } });
  cases.push({ category: "basic", description: "Single negative", inputs: { root: ["-3"] } });
  cases.push({ category: "basic", description: "Single positive", inputs: { root: ["5"] } });
  cases.push({ category: "basic", description: "All negative", inputs: { root: ["-2", "-1"] } });
  cases.push({ category: "basic", description: "Chain", inputs: { root: ["1", "2", "null", "3", "null", "4"] } });
  cases.push({ category: "basic", description: "Negative root with positive children", inputs: { root: ["-10", "15", "20"] } });
  cases.push({ category: "basic", description: "Large positives", inputs: { root: ["100", "200", "300"] } });
  cases.push({ category: "basic", description: "Zero values", inputs: { root: ["0", "0", "0"] } });
  cases.push({ category: "basic", description: "Zig zag", inputs: { root: ["5", "-2", "null", "null", "10"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, -20, 50))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, -20, 50)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 45)) } });
  }

  return cases;
}
