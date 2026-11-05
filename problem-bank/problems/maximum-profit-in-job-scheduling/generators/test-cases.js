import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { startTime: [1,2,3,3], endTime: [3,4,5,6], profit: [50,10,40,70] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { startTime: [1,2,3,4,6], endTime: [3,5,10,6,9], profit: [20,20,100,70,60] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { startTime: [1,1,1], endTime: [2,3,4], profit: [5,6,4] } });
  cases.push({ category: "basic", description: "Single job", inputs: { startTime: [5], endTime: [10], profit: [100] } });
  cases.push({ category: "basic", description: "Two disjoint jobs", inputs: { startTime: [1, 5], endTime: [4, 8], profit: [10, 20] } });
  cases.push({ category: "basic", description: "Two touching jobs (share boundary)", inputs: { startTime: [1, 5], endTime: [5, 10], profit: [15, 25] } });
  cases.push({ category: "basic", description: "Complete overlap take higher profit", inputs: { startTime: [1, 1], endTime: [5, 5], profit: [10, 50] } });
  cases.push({ category: "basic", description: "Three chained jobs", inputs: { startTime: [1, 3, 6], endTime: [3, 6, 9], profit: [10, 20, 30] } });
  cases.push({ category: "basic", description: "Bridge job worse than ends", inputs: { startTime: [1, 2, 5], endTime: [3, 6, 8], profit: [30, 10, 40] } });
  cases.push({ category: "basic", description: "Equal profit overlapping", inputs: { startTime: [1, 2, 3], endTime: [4, 5, 6], profit: [10, 10, 10] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const n = i - 8;
    const s = [], e = [], p = [];
    for (let j = 0; j < n; j++) {
      s.push(j * 5);
      e.push((j + 1) * 5);
      p.push((j + 1) * 10);
    }
    cases.push({ category: "edge", description: `Perfect chain n=${n}`, inputs: { startTime: s, endTime: e, profit: p } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const n = i - 15;
    const s = Array(n).fill(1);
    const e = Array.from({ length: n }, (_, j) => j + 2);
    const p = Array.from({ length: n }, (_, j) => (j + 1) * 5);
    cases.push({ category: "boundary", description: `Same start time different ends n=${n}`, inputs: { startTime: s, endTime: e, profit: p } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const n = randomInt(rng, 10, 30);
    const s = [], e = [], p = [];
    for (let j = 0; j < n; j++) {
      const st = randomInt(rng, 1, 100);
      const en = st + randomInt(rng, 1, 50);
      s.push(st);
      e.push(en);
      p.push(randomInt(rng, 10, 200));
    }
    cases.push({ category: "random", description: `Random jobs n=${n}`, inputs: { startTime: s, endTime: e, profit: p } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const n = 150;
    const s = [], e = [], p = [];
    for (let j = 0; j < n; j++) {
      const st = randomInt(rng, 1, 1000);
      const en = st + randomInt(rng, 1, 200);
      s.push(st);
      e.push(en);
      p.push(randomInt(rng, 10, 500));
    }
    cases.push({ category: "stress", description: `Stress jobs n=${n}`, inputs: { startTime: s, endTime: e, profit: p } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    // One big long job vs many small jobs
    const n = 50;
    const s = [1], e = [200], p = [500]; // long job
    for (let j = 1; j < n; j++) {
      s.push(j * 4);
      e.push((j + 1) * 4);
      p.push(15);
    }
    cases.push({ category: "adversarial", description: `Adversarial long vs many short jobs ${i}`, inputs: { startTime: s, endTime: e, profit: p } });
  }

  return cases;
}
