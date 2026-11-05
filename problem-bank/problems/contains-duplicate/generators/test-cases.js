import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [42] } });
  cases.push({ category: "basic", description: "Pair distinct", inputs: { nums: [10, 20] } });
  cases.push({ category: "basic", description: "Pair duplicate", inputs: { nums: [7, 7] } });
  cases.push({ category: "basic", description: "Negative distinct", inputs: { nums: [-5, -10, -15] } });
  cases.push({ category: "basic", description: "Negative duplicate", inputs: { nums: [-3, 0, -3] } });
  cases.push({ category: "basic", description: "Zeros distinct", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "Zeros duplicate", inputs: { nums: [0, 0] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const hasDup = i % 2 === 0;
    const len = (i % 5) + 3;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(j * 10);
    if (hasDup) arr[len - 1] = arr[0];
    cases.push({
      category: "edge",
      description: `Edge case size ${len} hasDup=${hasDup}`,
      inputs: { nums: shuffle(rng, arr) }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    const baseVal = 1000000;
    for (let j = 0; j < len; j++) arr.push(baseVal + j);
    if (i % 2 === 0) arr[len - 1] = baseVal + 1; // duplicate near start
    cases.push({
      category: "corner",
      description: `Corner case size ${len}`,
      inputs: { nums: shuffle(rng, arr) }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 100);
    const hasDup = i % 2 === 0;
    const arr = [];
    const range = hasDup ? Math.max(2, Math.floor(len / 2)) : len * 10;
    const used = new Set();
    while (arr.length < len) {
      const val = randomInt(rng, -1000, 1000);
      if (!hasDup && used.has(val)) continue;
      used.add(val);
      arr.push(val);
    }
    cases.push({
      category: "random",
      description: `Random array size ${len}`,
      inputs: { nums: arr }
    });
  }

  // Stress (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 2000;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(j);
    if (i % 2 === 0) {
      arr[len - 1] = 0; // duplicate at endpoints
    }
    cases.push({
      category: "stress",
      description: `Stress size ${len}`,
      inputs: { nums: shuffle(rng, arr) }
    });
  }

  return cases;
}
