import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2 with zero", inputs: { nums: [-1, 1, 0, -3, 3] } });
  cases.push({ category: "basic", description: "Length 2 pair", inputs: { nums: [2, 3] } });
  cases.push({ category: "basic", description: "Length 2 with negative", inputs: { nums: [-2, 5] } });
  cases.push({ category: "basic", description: "Two zeroes", inputs: { nums: [0, 1, 0] } });
  cases.push({ category: "basic", description: "All ones", inputs: { nums: [1, 1, 1, 1] } });
  cases.push({ category: "basic", description: "Alternating 1 and -1", inputs: { nums: [1, -1, 1, -1, 1] } });
  cases.push({ category: "basic", description: "Single zero at end", inputs: { nums: [1, 2, 3, 0] } });
  cases.push({ category: "basic", description: "Single zero at start", inputs: { nums: [0, 4, 5, 2] } });
  cases.push({ category: "basic", description: "Power of twos", inputs: { nums: [2, 2, 2, 2] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = (i % 5) + 3;
    const nums = [];
    for (let j = 0; j < len; j++) {
      nums.push(randomInt(rng, -2, 2));
    }
    cases.push({
      category: "edge",
      description: `Edge case len=${len}`,
      inputs: { nums }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 10;
    const nums = new Array(len).fill(1);
    if (i % 3 === 0) nums[0] = 0;
    if (i % 3 === 1) { nums[2] = 0; nums[7] = 0; }
    if (i % 3 === 2) { nums[1] = -2; nums[4] = 3; }
    cases.push({
      category: "corner",
      description: `Corner zero patterns ${i}`,
      inputs: { nums }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 30);
    // Keep numbers small (-2 to 2 or 1s) to prevent 32-bit overflow
    const nums = [];
    for (let j = 0; j < len; j++) {
      const pick = randomInt(rng, 0, 10);
      if (pick === 0) nums.push(0);
      else if (pick < 4) nums.push(-1);
      else if (pick < 7) nums.push(1);
      else if (pick === 7) nums.push(2);
      else nums.push(1);
    }
    cases.push({
      category: "random",
      description: `Random array len=${len}`,
      inputs: { nums }
    });
  }

  // Stress (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 1000;
    // Length 1000 with 1, -1 and at most one zero to guarantee 32-bit range
    const nums = [];
    for (let j = 0; j < len; j++) {
      nums.push(randomInt(rng, 0, 1) === 0 ? 1 : -1);
    }
    if (i % 2 === 0) nums[500] = 0;
    cases.push({
      category: "stress",
      description: `Stress size=${len}`,
      inputs: { nums }
    });
  }

  return cases;
}
