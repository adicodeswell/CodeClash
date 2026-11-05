import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 1, 2, 2, 3], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1], k: 1 } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { nums: [-1, -1, 2], k: 1 } });
  cases.push({ category: "basic", description: "k equals unique count", inputs: { nums: [4, 5, 6], k: 3 } });
  cases.push({ category: "basic", description: "Distinct frequencies", inputs: { nums: [10, 10, 10, 10, 20, 20, 20, 30, 30, 40], k: 2 } });
  cases.push({ category: "basic", description: "Two elements k=1", inputs: { nums: [5, 5, 8], k: 1 } });
  cases.push({ category: "basic", description: "Zero with positives", inputs: { nums: [0, 0, 1, 2, 2, 2], k: 2 } });
  cases.push({ category: "basic", description: "All same element", inputs: { nums: [7, 7, 7, 7], k: 1 } });
  cases.push({ category: "basic", description: "Strict frequencies 4,3,2,1", inputs: { nums: [1,1,1,1, 2,2,2, 3,3, 4], k: 3 } });
  cases.push({ category: "basic", description: "Negative dominance", inputs: { nums: [-9, -9, -9, 10, 10, 5], k: 1 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const k = (i % 3) + 1;
    const nums = [];
    // Strict frequency ladder to avoid ties: freq = (count + j*3)
    for (let j = 0; j < 5; j++) {
      const count = 15 - j * 3;
      for (let c = 0; c < count; c++) nums.push(j * 10 - 20);
    }
    cases.push({
      category: "edge",
      description: `Edge frequency ladder k=${k}`,
      inputs: { nums: shuffle(rng, nums), k }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const nums = [];
    const k = 2;
    for (let c = 0; c < 20; c++) nums.push(100);
    for (let c = 0; c < 15; c++) nums.push(200);
    for (let c = 0; c < 5; c++) nums.push(300);
    for (let c = 0; c < 2; c++) nums.push(400);
    cases.push({
      category: "corner",
      description: `Corner dominant pairs ${i}`,
      inputs: { nums: shuffle(rng, nums), k }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const numUnique = randomInt(rng, 5, 10);
    const k = randomInt(rng, 1, 3);
    const nums = [];
    // Assign strictly strictly decreasing frequencies
    for (let u = 0; u < numUnique; u++) {
      const count = (numUnique - u) * 4 + randomInt(rng, 1, 2);
      for (let c = 0; c < count; c++) nums.push(u * 5 - 25);
    }
    cases.push({
      category: "random",
      description: `Random unique=${numUnique} k=${k}`,
      inputs: { nums: shuffle(rng, nums), k }
    });
  }

  // Stress (65 - 79)
  for (let i = 65; i < 80; i++) {
    const nums = [];
    const k = (i % 4) + 1;
    for (let u = 0; u < 20; u++) {
      const count = (25 - u) * 10;
      for (let c = 0; c < count; c++) nums.push(u * 2 - 20);
    }
    cases.push({
      category: "stress",
      description: `Stress size=${nums.length} k=${k}`,
      inputs: { nums: shuffle(rng, nums), k }
    });
  }

  return cases;
}
