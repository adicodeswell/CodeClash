import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const INF = 2147483647;

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      rooms: [
        [INF, -1, 0, INF],
        [INF, INF, INF, -1],
        [INF, -1, INF, -1],
        [0, -1, INF, INF]
      ]
    }
  });

  cases.push({ category: "basic", description: "Single gate", inputs: { rooms: [[0]] } });
  cases.push({ category: "basic", description: "Gate and room", inputs: { rooms: [[0, INF]] } });

  for (let i = 3; i < 10; i++) {
    const r = [
      [0, INF, INF],
      [INF, -1, INF],
      [INF, INF, 0]
    ];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { rooms: r } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const r = [[0, -1, INF]];
    cases.push({ category: "edge", description: "1x3 rooms " + i, inputs: { rooms: r } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner all gates " + i, inputs: { rooms: [[0, 0], [0, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 5, n = 5;
    const r = [];
    for (let row = 0; row < m; row++) {
      const line = [];
      for (let col = 0; col < n; col++) {
        const p = rng();
        if (p < 0.15) line.push(0);
        else if (p < 0.35) line.push(-1);
        else line.push(INF);
      }
      r.push(line);
    }
    r[0][0] = 0; // ensure at least one gate
    cases.push({ category: "random", description: "Random 5x5 " + i, inputs: { rooms: r } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 10, n = 10;
    const r = [];
    for (let row = 0; row < m; row++) {
      const line = [];
      for (let col = 0; col < n; col++) {
        const p = rng();
        if (p < 0.1) line.push(0);
        else if (p < 0.25) line.push(-1);
        else line.push(INF);
      }
      r.push(line);
    }
    r[0][0] = 0;
    cases.push({ category: "large", description: "Large 10x10 " + i, inputs: { rooms: r } });
  }

  return cases;
}
