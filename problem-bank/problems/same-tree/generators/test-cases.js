import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { p: ["1", "2", "3"], q: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { p: ["1", "2"], q: ["1", "null", "2"] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { p: ["1", "2", "1"], q: ["1", "1", "2"] } });
  cases.push({ category: "basic", description: "Single identical", inputs: { p: ["5"], q: ["5"] } });
  cases.push({ category: "basic", description: "Single different", inputs: { p: ["5"], q: ["6"] } });
  cases.push({ category: "basic", description: "Left vs right", inputs: { p: ["1", "2"], q: ["1", "null", "2"] } });
  cases.push({ category: "basic", description: "Deep identical", inputs: { p: ["1", "2", "3", "4"], q: ["1", "2", "3", "4"] } });
  cases.push({ category: "basic", description: "Deep value diff", inputs: { p: ["1", "2", "3", "4"], q: ["1", "2", "3", "5"] } });
  cases.push({ category: "basic", description: "Negative vals", inputs: { p: ["-1", "-2"], q: ["-1", "-2"] } });
  cases.push({ category: "basic", description: "Asymmetric trees", inputs: { p: ["1", "2", "null"], q: ["1", "null", "2"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 50))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 3) === 0 ? "null" : String(randomInt(rng, 1, 50)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const same = i % 2 === 0;
    const t = makeTree(3 + (i % 4));
    const q = same ? [...t] : makeTree(3 + (i % 4));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { p: t, q } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const same = i % 2 === 0;
    const t = makeTree(8);
    const q = same ? [...t] : makeTree(8);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { p: t, q } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const same = i % 2 === 0;
    const t = makeTree(randomInt(rng, 10, 20));
    const q = same ? [...t] : makeTree(randomInt(rng, 10, 20));
    cases.push({ category: "random", description: "Random " + i, inputs: { p: t, q } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const same = i % 2 === 0;
    const t = makeTree(randomInt(rng, 25, 40));
    const q = same ? [...t] : makeTree(randomInt(rng, 25, 40));
    cases.push({ category: "large", description: "Large " + i, inputs: { p: t, q } });
  }

  return cases;
}
