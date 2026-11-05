import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { points: [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { points: [[3, 12], [-2, 5], [-4, 1]] } });
  cases.push({ category: "basic", description: "Two points", inputs: { points: [[0, 0], [1, 1]] } });

  for (let i = 3; i < 10; i++) {
    const pts = [[0, 0], [i, i], [-i, i]];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { points: pts } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single point " + i, inputs: { points: [[0, 0]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Points on line " + i, inputs: { points: [[1, 0], [2, 0], [3, 0], [4, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 5, 12);
    const pts = [];
    const seen = new Set();
    while (pts.length < count) {
      const x = randomInt(rng, -100, 100);
      const y = randomInt(rng, -100, 100);
      const key = `${x},${y}`;
      if (!seen.has(key)) {
        seen.add(key);
        pts.push([x, y]);
      }
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { points: pts } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 15, 30);
    const pts = [];
    const seen = new Set();
    while (pts.length < count) {
      const x = randomInt(rng, -500, 500);
      const y = randomInt(rng, -500, 500);
      const key = `${x},${y}`;
      if (!seen.has(key)) {
        seen.add(key);
        pts.push([x, y]);
      }
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { points: pts } });
  }

  return cases;
}
