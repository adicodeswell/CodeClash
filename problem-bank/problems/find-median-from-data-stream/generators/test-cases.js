import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["addNum", "addNum", "findMedian", "addNum", "findMedian"],
      values: [[1], [2], [], [3], []]
    }
  });

  cases.push({
    category: "basic",
    description: "Single element",
    inputs: {
      operations: ["addNum", "findMedian"],
      values: [[5], []]
    }
  });

  for (let i = 2; i < 10; i++) {
    const ops = ["addNum", "addNum", "findMedian", "addNum", "findMedian"];
    const vals = [[randomInt(rng, 1, 20)], [randomInt(rng, 1, 20)], [], [randomInt(rng, 1, 20)], []];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { operations: ops, values: vals } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const ops = ["addNum", "findMedian", "addNum", "findMedian"];
    const v1 = randomInt(rng, -100, 100);
    const v2 = randomInt(rng, -100, 100);
    cases.push({
      category: "edge",
      description: "Negative numbers " + i,
      inputs: { operations: ops, values: [[v1], [], [v2], []] }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = ["addNum", "addNum", "addNum", "addNum", "findMedian"];
    const same = randomInt(rng, 1, 50);
    cases.push({
      category: "corner",
      description: "Equal elements " + i,
      inputs: { operations: ops, values: [[same], [same], [same], [same], []] }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = ["addNum"];
    const vals = [[randomInt(rng, -500, 500)]];
    for (let k = 0; k < 20; k++) {
      if (rng() > 0.4) {
        ops.push("addNum");
        vals.push([randomInt(rng, -500, 500)]);
      } else {
        ops.push("findMedian");
        vals.push([]);
      }
    }
    cases.push({ category: "random", description: "Random stream " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = ["addNum"];
    const vals = [[randomInt(rng, -1000, 1000)]];
    for (let k = 0; k < 40; k++) {
      if (rng() > 0.4) {
        ops.push("addNum");
        vals.push([randomInt(rng, -1000, 1000)]);
      } else {
        ops.push("findMedian");
        vals.push([]);
      }
    }
    cases.push({ category: "large", description: "Large stream " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}
