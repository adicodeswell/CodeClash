import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 5, bad: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 1, bad: 1 } });
  cases.push({ category: "basic", description: "n=2, bad=1", inputs: { n: 2, bad: 1 } });
  cases.push({ category: "basic", description: "n=2, bad=2", inputs: { n: 2, bad: 2 } });
  cases.push({ category: "basic", description: "n=3, bad=2", inputs: { n: 3, bad: 2 } });
  cases.push({ category: "basic", description: "n=10, bad=1", inputs: { n: 10, bad: 1 } });
  cases.push({ category: "basic", description: "n=10, bad=10", inputs: { n: 10, bad: 10 } });
  cases.push({ category: "basic", description: "n=10, bad=5", inputs: { n: 10, bad: 5 } });
  cases.push({ category: "basic", description: "n=20, bad=7", inputs: { n: 20, bad: 7 } });
  cases.push({ category: "basic", description: "n=100, bad=42", inputs: { n: 100, bad: 42 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const n = i * 10;
    const bad = (i % 2 === 0) ? 1 : n;
    cases.push({ category: "edge", description: `Edge n=${n}, bad=${bad}`, inputs: { n, bad } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const n = 1000 + i * 50;
    const bad = Math.floor(n / 2) + (i % 3);
    cases.push({ category: "boundary", description: `Boundary n=${n}, bad=${bad}`, inputs: { n, bad } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const n = randomInt(rng, 100, 100000);
    const bad = randomInt(rng, 1, n);
    cases.push({ category: "random", description: `Random n=${n}`, inputs: { n, bad } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const n = randomInt(rng, 1000000, 2000000000);
    const bad = randomInt(rng, 1, n);
    cases.push({ category: "stress", description: `Large stress n=${n}`, inputs: { n, bad } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    const n = 2147483647; // 2^31 - 1
    const bad = (i % 2 === 0) ? 2147483647 - (i - 70) : (i - 69);
    cases.push({ category: "adversarial", description: `Int32 max boundary n=${n}, bad=${bad}`, inputs: { n, bad } });
  }

  return cases;
}
