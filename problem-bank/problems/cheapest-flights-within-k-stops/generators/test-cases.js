import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: { n: 4, flights: [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src: 0, dst: 3, k: 1 }
  });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 1 }
  });
  cases.push({
    category: "basic",
    description: "Example 3",
    inputs: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 0 }
  });

  for (let i = 3; i < 10; i++) {
    cases.push({
      category: "basic",
      description: "Direct flight " + i,
      inputs: { n: 3, flights: [[0, 1, 50], [1, 2, 50]], src: 0, dst: 2, k: 1 }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "No route " + i,
      inputs: { n: 3, flights: [[0, 1, 100]], src: 0, dst: 2, k: 1 }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Zero stops limit " + i,
      inputs: { n: 3, flights: [[0, 2, 300], [0, 1, 100], [1, 2, 100]], src: 0, dst: 2, k: 0 }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 7);
    const flights = [];
    for (let u = 0; u < n - 1; u++) {
      flights.push([u, u + 1, randomInt(rng, 10, 100)]);
    }
    cases.push({ category: "random", description: "Random chain " + i, inputs: { n, flights, src: 0, dst: n - 1, k: n - 2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 8, 15);
    const flights = [];
    for (let u = 0; u < n - 1; u++) {
      flights.push([u, u + 1, randomInt(rng, 20, 150)]);
      if (u + 2 < n) flights.push([u, u + 2, randomInt(rng, 100, 300)]);
    }
    cases.push({ category: "large", description: "Large network " + i, inputs: { n, flights, src: 0, dst: n - 1, k: 3 } });
  }

  return cases;
}
