import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { points: [[1, 3], [-2, 2]], k: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { points: [[3, 3], [5, -1], [-2, 4]], k: 2 } });
  cases.push({ category: "basic", description: "Origin point", inputs: { points: [[0, 0], [1, 1], [2, 2]], k: 2 } });

  for (let i = 3; i < 10; i++) {
    const pts = [
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)],
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)],
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)],
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)]
    ];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { points: pts, k: 2 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pts = [[randomInt(rng, -5, 5), randomInt(rng, -5, 5)]];
    cases.push({ category: "edge", description: "Single point k=1 " + i, inputs: { points: pts, k: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const pts = [
      [1, 2], [-1, 2], [1, -2], [-1, -2],
      [2, 1], [-2, 1], [2, -1], [-2, -1]
    ];
    cases.push({ category: "corner", description: "Equal distance points " + i, inputs: { points: pts, k: 4 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 10, 25);
    const pts = [];
    for (let j = 0; j < n; j++) {
      pts.push([randomInt(rng, -100, 100), randomInt(rng, -100, 100)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { points: pts, k: randomInt(rng, 1, n) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 30, 60);
    const pts = [];
    for (let j = 0; j < n; j++) {
      pts.push([randomInt(rng, -500, 500), randomInt(rng, -500, 500)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { points: pts, k: randomInt(rng, 5, 20) } });
  }

  return cases;
}
