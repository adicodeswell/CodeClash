import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 3, 4, 2, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 1, 3, 4, 2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [3, 3, 3, 3, 3] } });
  cases.push({ category: "basic", description: "Pair dup", inputs: { nums: [1, 1] } });
  cases.push({ category: "basic", description: "Triplets", inputs: { nums: [2, 2, 2, 2] } });
  cases.push({ category: "basic", description: "At ends", inputs: { nums: [2, 1, 3, 2] } });
  cases.push({ category: "basic", description: "Dup is 1", inputs: { nums: [1, 2, 3, 1] } });
  cases.push({ category: "basic", description: "Dup is n", inputs: { nums: [1, 2, 3, 4, 4] } });
  cases.push({ category: "basic", description: "Alternating dup", inputs: { nums: [2, 1, 2, 3] } });
  cases.push({ category: "basic", description: "Adjacent dup", inputs: { nums: [1, 2, 2, 3, 4] } });

  function makeCase(n) {
    const dup = randomInt(rng, 1, n);
    const arr = [];
    for (let i = 1; i <= n; i++) arr.push(i);
    arr.push(dup);
    return shuffle(rng, arr);
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums: makeCase(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: makeCase(10) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: makeCase(randomInt(rng, 15, 30)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: makeCase(randomInt(rng, 50, 150)) } });
  }

  return cases;
}
