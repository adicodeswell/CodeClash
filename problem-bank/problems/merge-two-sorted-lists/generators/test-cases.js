import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { list1: [1, 2, 4], list2: [1, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { list1: [], list2: [0] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { list1: [5], list2: [] } });
  cases.push({ category: "basic", description: "Single each", inputs: { list1: [1], list2: [2] } });
  cases.push({ category: "basic", description: "Disjoint ranges", inputs: { list1: [1, 2, 3], list2: [4, 5, 6] } });
  cases.push({ category: "basic", description: "Reverse disjoint", inputs: { list1: [10, 20], list2: [1, 2] } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { list1: [2, 2], list2: [2, 2] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { list1: [-5, -2], list2: [-3, 0] } });
  cases.push({ category: "basic", description: "Unequal sizes", inputs: { list1: [1, 3, 5, 7, 9], list2: [2] } });
  cases.push({ category: "basic", description: "All zeros", inputs: { list1: [0], list2: [0, 0] } });

  function makeSorted(len, min, max) {
    const arr = [];
    for (let i = 0; i < len; i++) arr.push(randomInt(rng, min, max));
    return arr.sort((a, b) => a - b);
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len1 = i % 2 === 0 ? 0 : 3;
    const len2 = len1 === 0 ? 4 : (i % 4) + 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { list1: makeSorted(len1, -20, 20), list2: makeSorted(len2, -20, 20) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { list1: makeSorted(8, -50, 50), list2: makeSorted(8, -50, 50) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { list1: makeSorted(randomInt(rng, 5, 20), -100, 100), list2: makeSorted(randomInt(rng, 5, 20), -100, 100) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { list1: makeSorted(randomInt(rng, 20, 50), -100, 100), list2: makeSorted(randomInt(rng, 20, 50), -100, 100) } });
  }

  return cases;
}
