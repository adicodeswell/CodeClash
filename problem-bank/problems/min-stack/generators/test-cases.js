import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      operations: ["push", "push", "push", "getMin", "pop", "top", "getMin"],
      values: [[-2], [0], [-3], [], [], [], []]
    }
  });

  cases.push({
    category: "basic",
    description: "Single push getMin",
    inputs: {
      operations: ["push", "getMin", "top"],
      values: [[5], [], []]
    }
  });

  cases.push({
    category: "basic",
    description: "Equal values",
    inputs: {
      operations: ["push", "push", "getMin", "pop", "getMin"],
      values: [[10], [10], [], [], []]
    }
  });

  function makeCase(stepCount) {
    const ops = ["push"];
    const vals = [[randomInt(rng, -100, 100)]];
    let size = 1;
    for (let i = 1; i < stepCount; i++) {
      const choice = randomInt(rng, 0, 3);
      if (choice === 0 || size === 0) {
        ops.push("push");
        vals.push([randomInt(rng, -500, 500)]);
        size++;
      } else if (choice === 1 && size > 1) {
        ops.push("pop");
        vals.push([]);
        size--;
      } else if (choice === 2) {
        ops.push("top");
        vals.push([]);
      } else {
        ops.push("getMin");
        vals.push([]);
      }
    }
    return { operations: ops, values: vals };
  }

  // Edge (3 - 24)
  for (let i = 3; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(8 + (i % 6)) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(18) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(randomInt(rng, 25, 50)) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(randomInt(rng, 60, 120)) });
  }

  return cases;
}
