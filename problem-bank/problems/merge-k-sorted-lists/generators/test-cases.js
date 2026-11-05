import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { lists: [[], [1]] } });
  cases.push({ category: "basic", description: "Single list", inputs: { lists: [[1, 2, 3]] } });
  cases.push({ category: "basic", description: "Two lists disjoint", inputs: { lists: [[1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { lists: [[2, 2], [2, 2]] } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { lists: [[-5, -2], [-10, 0]] } });
  cases.push({ category: "basic", description: "Empty first", inputs: { lists: [[], [2, 3], [1]] } });
  cases.push({ category: "basic", description: "Four singletons", inputs: { lists: [[4], [1], [3], [2]] } });
  cases.push({ category: "basic", description: "Alternating elements", inputs: { lists: [[1, 3, 5], [2, 4, 6]] } });
  cases.push({ category: "basic", description: "All zeros", inputs: { lists: [[0], [0, 0]] } });

  function makeLists(k, totalLen) {
    const lists = [];
    const avgLen = Math.max(1, Math.floor(totalLen / k));
    for (let i = 0; i < k; i++) {
      const len = i === 0 ? Math.max(1, avgLen) : avgLen;
      const arr = [];
      for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
      lists.push(arr.sort((a, b) => a - b));
    }
    return lists;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { lists: makeLists(2 + (i % 3), 6 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { lists: makeLists(4, 16) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { lists: makeLists(randomInt(rng, 3, 6), randomInt(rng, 15, 30)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { lists: makeLists(randomInt(rng, 5, 10), randomInt(rng, 40, 80)) } });
  }

  return cases;
}
