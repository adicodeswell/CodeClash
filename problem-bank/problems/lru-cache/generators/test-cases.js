import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      capacity: 2,
      operations: ["put", "put", "get", "put", "get", "put", "get", "get", "get"],
      values: [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    }
  });

  cases.push({
    category: "basic",
    description: "Capacity 1",
    inputs: {
      capacity: 1,
      operations: ["put", "get", "put", "get"],
      values: [[2, 1], [2], [3, 2], [2]]
    }
  });

  cases.push({
    category: "basic",
    description: "Overwrite existing",
    inputs: {
      capacity: 2,
      operations: ["put", "put", "put", "get"],
      values: [[1, 10], [1, 20], [2, 30], [1]]
    }
  });

  function makeCase(cap, stepCount) {
    const ops = [];
    const vals = [];
    for (let i = 0; i < stepCount; i++) {
      if (i < cap || randomInt(rng, 0, 1) === 0) {
        ops.push("put");
        vals.push([randomInt(rng, 1, cap + 2), randomInt(rng, 10, 99)]);
      } else {
        ops.push("get");
        vals.push([randomInt(rng, 1, cap + 2)]);
      }
    }
    return { capacity: cap, operations: ops, values: vals };
  }

  // Edge (3 - 24)
  for (let i = 3; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(2, 6 + (i % 4)) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(3, 12) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(randomInt(rng, 2, 5), randomInt(rng, 15, 30)) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(randomInt(rng, 5, 10), randomInt(rng, 30, 60)) });
  }

  return cases;
}
