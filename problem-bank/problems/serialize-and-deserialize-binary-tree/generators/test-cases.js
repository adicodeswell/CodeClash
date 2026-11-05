import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["1", "2", "3", "null", "null", "4", "5"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { root: ["1", "2"] } });
  cases.push({ category: "basic", description: "Three elements line", inputs: { root: ["1", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Balanced depth 3", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "Negative numbers", inputs: { root: ["-1", "-2", "3"] } });
  cases.push({ category: "basic", description: "Null leaf gap", inputs: { root: ["1", "null", "2", "3"] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { root: ["0", "0", "0"] } });
  cases.push({ category: "basic", description: "Deep left", inputs: { root: ["1", "2", "null", "3", "null", "4"] } });
  cases.push({ category: "basic", description: "Deep right", inputs: { root: ["1", "null", "2", "null", "3"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
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
