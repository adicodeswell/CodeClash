import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { tasks: ["A", "A", "A", "B", "B", "B"], n: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { tasks: ["A", "C", "A", "B", "D", "B"], n: 1 } });
  cases.push({ category: "basic", description: "n = 0 no cooldown", inputs: { tasks: ["A", "A", "B"], n: 0 } });
  cases.push({ category: "basic", description: "Single task", inputs: { tasks: ["A"], n: 2 } });

  for (let i = 4; i < 10; i++) {
    const tasks = [];
    const pool = ["A", "B", "C"];
    for (let j = 0; j < 8; j++) tasks.push(pickRandom(rng, pool));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { tasks, n: randomInt(rng, 1, 3) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const letter = letters[i % letters.length];
    const tasks = Array(randomInt(rng, 2, 5)).fill(letter);
    cases.push({ category: "edge", description: "Identical tasks " + i, inputs: { tasks, n: randomInt(rng, 1, 4) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const tasks = [];
    for (let j = 0; j < 10; j++) tasks.push(letters[j]);
    cases.push({ category: "corner", description: "All distinct tasks " + i, inputs: { tasks, n: randomInt(rng, 1, 5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 15, 35);
    const pool = letters.slice(0, 5).split("");
    const tasks = [];
    for (let j = 0; j < len; j++) tasks.push(pickRandom(rng, pool));
    cases.push({ category: "random", description: "Random tasks " + i, inputs: { tasks, n: randomInt(rng, 1, 4) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 40, 80);
    const pool = letters.slice(0, 8).split("");
    const tasks = [];
    for (let j = 0; j < len; j++) tasks.push(pickRandom(rng, pool));
    cases.push({ category: "large", description: "Large tasks " + i, inputs: { tasks, n: randomInt(rng, 2, 6) } });
  }

  return cases;
}
