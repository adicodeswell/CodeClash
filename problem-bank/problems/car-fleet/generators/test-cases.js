import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { target: 10, position: [3], speed: [3] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { target: 100, position: [0, 2, 4], speed: [4, 2, 1] } });
  cases.push({ category: "basic", description: "Two cars meet", inputs: { target: 10, position: [6, 8], speed: [3, 2] } });
  cases.push({ category: "basic", description: "Two cars never meet", inputs: { target: 10, position: [6, 8], speed: [1, 2] } });
  cases.push({ category: "basic", description: "Three cars same speed", inputs: { target: 20, position: [0, 5, 10], speed: [2, 2, 2] } });
  cases.push({ category: "basic", description: "Target close", inputs: { target: 5, position: [1, 2, 3], speed: [5, 4, 3] } });
  cases.push({ category: "basic", description: "All cars merge", inputs: { target: 50, position: [0, 10, 20], speed: [10, 5, 2] } });
  cases.push({ category: "basic", description: "No cars merge", inputs: { target: 50, position: [0, 10, 20], speed: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Single car far", inputs: { target: 1000, position: [10], speed: [100] } });

  function makeCase(n, target) {
    const usedPos = new Set();
    const pos = [];
    const spd = [];
    while (pos.length < n) {
      const p = randomInt(rng, 0, target - 1);
      if (!usedPos.has(p)) {
        usedPos.add(p);
        pos.push(p);
        spd.push(randomInt(rng, 1, 20));
      }
    }
    return { target, position: pos, speed: spd };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(3 + (i % 4), 30) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(10, 100) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(randomInt(rng, 15, 30), 200) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(randomInt(rng, 40, 80), 1000) });
  }

  return cases;
}
