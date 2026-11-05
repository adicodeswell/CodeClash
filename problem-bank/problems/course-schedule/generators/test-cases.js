import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { numCourses: 2, prerequisites: [[1, 0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] } });
  cases.push({ category: "basic", description: "No prerequisites", inputs: { numCourses: 3, prerequisites: [] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { numCourses: 3, prerequisites: [[1, 0], [2, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single course " + i, inputs: { numCourses: 1, prerequisites: [] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Cycle 3 " + i, inputs: { numCourses: 3, prerequisites: [[1, 0], [2, 1], [0, 2]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 8);
    const prereqs = [];
    for (let u = 1; u < n; u++) {
      prereqs.push([u, u - 1]);
    }
    if (rng() > 0.5) prereqs.push([0, n - 1]); // add cycle
    cases.push({ category: "random", description: "Random " + i, inputs: { numCourses: n, prerequisites: prereqs } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 10, 20);
    const prereqs = [];
    for (let u = 1; u < n; u++) {
      prereqs.push([u, randomInt(rng, 0, u - 1)]);
    }
    cases.push({ category: "large", description: "Large DAG " + i, inputs: { numCourses: n, prerequisites: prereqs } });
  }

  return cases;
}
