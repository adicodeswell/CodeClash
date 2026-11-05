import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { numbers: [2, 7, 11, 15], target: 9 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { numbers: [2, 3, 4], target: 6 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { numbers: [-1, 0], target: -1 } });
  cases.push({ category: "basic", description: "Two elements", inputs: { numbers: [5, 10], target: 15 } });
  cases.push({ category: "basic", description: "Negative target", inputs: { numbers: [-10, -5, 0, 3], target: -15 } });
  cases.push({ category: "basic", description: "Zero sum", inputs: { numbers: [-4, -1, 1, 5], target: 0 } });
  cases.push({ category: "basic", description: "Duplicates", inputs: { numbers: [1, 2, 2, 4], target: 4 } });
  cases.push({ category: "basic", description: "Outer elements", inputs: { numbers: [1, 3, 5, 9], target: 10 } });
  cases.push({ category: "basic", description: "Inner elements", inputs: { numbers: [0, 4, 6, 20], target: 10 } });
  cases.push({ category: "basic", description: "Adjacent elements", inputs: { numbers: [1, 2, 3, 7], target: 5 } });

  // Helper to generate sorted array with unique pair summing to target
  function makeCase(len, minVal, maxVal) {
    const arr = [];
    for (let j = 0; j < len; j++) {
      arr.push(minVal + j * Math.max(1, Math.floor((maxVal - minVal) / len)));
    }
    const idx1 = randomInt(rng, 0, Math.floor(len / 2) - 1);
    const idx2 = randomInt(rng, Math.floor(len / 2), len - 1);
    const target = arr[idx1] + arr[idx2];
    return { numbers: arr, target };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const c = makeCase(5 + (i % 5), -50, 50);
    cases.push({ category: "edge", description: "Edge " + i, inputs: c });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const c = makeCase(12, -200, 200);
    cases.push({ category: "corner", description: "Corner " + i, inputs: c });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const c = makeCase(randomInt(rng, 20, 60), -500, 500);
    cases.push({ category: "random", description: "Random " + i, inputs: c });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const c = makeCase(randomInt(rng, 100, 300), -1000, 1000);
    cases.push({ category: "large", description: "Large " + i, inputs: c });
  }

  return cases;
}
