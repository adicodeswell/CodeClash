import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: { k: 3, nums: [4, 5, 8, 2], valList: [3, 5, 10, 9, 4] }
  });
  cases.push({
    category: "basic",
    description: "k = 1 largest so far",
    inputs: { k: 1, nums: [1, 2], valList: [3, 1, 5, 4] }
  });
  cases.push({
    category: "basic",
    description: "Small stream",
    inputs: { k: 2, nums: [10], valList: [20, 5, 30] }
  });

  for (let i = 3; i < 10; i++) {
    const k = randomInt(rng, 1, 3);
    const nums = [];
    for (let j = 0; j < k; j++) nums.push(randomInt(rng, 1, 50));
    const valList = [];
    for (let j = 0; j < 5; j++) valList.push(randomInt(rng, 1, 50));
    cases.push({
      category: "basic",
      description: "Basic case " + i,
      inputs: { k, nums, valList }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const k = 2;
    const nums = [randomInt(rng, -100, 100), randomInt(rng, -100, 100)];
    const valList = [];
    for (let j = 0; j < 10; j++) valList.push(randomInt(rng, -100, 100));
    cases.push({
      category: "edge",
      description: "Edge case " + i,
      inputs: { k, nums, valList }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const k = 1;
    const nums = [0];
    const valList = [randomInt(rng, 1, 10), randomInt(rng, 11, 20), randomInt(rng, 21, 30)];
    cases.push({
      category: "corner",
      description: "Corner k=1 " + i,
      inputs: { k, nums, valList }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const k = randomInt(rng, 2, 5);
    const nums = [];
    for (let j = 0; j < k + 3; j++) nums.push(randomInt(rng, -500, 500));
    const valList = [];
    for (let j = 0; j < 20; j++) valList.push(randomInt(rng, -500, 500));
    cases.push({
      category: "random",
      description: "Random stream " + i,
      inputs: { k, nums, valList }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const k = randomInt(rng, 5, 10);
    const nums = [];
    for (let j = 0; j < k + 10; j++) nums.push(randomInt(rng, -1000, 1000));
    const valList = [];
    for (let j = 0; j < 40; j++) valList.push(randomInt(rng, -1000, 1000));
    cases.push({
      category: "large",
      description: "Large stream " + i,
      inputs: { k, nums, valList }
    });
  }

  return cases;
}
