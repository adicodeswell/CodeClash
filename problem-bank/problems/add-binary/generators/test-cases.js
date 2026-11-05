import { randomInt } from "../../../scripts/utils/prng.js";

function randBinary(rng, len) {
  let s = "1";
  for (let i = 1; i < len; i++) {
    s += randomInt(rng, 0, 1).toString();
  }
  return s;
}

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { a: "11", b: "1" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { a: "1010", b: "1011" } });
  cases.push({ category: "basic", description: "0 + 0", inputs: { a: "0", b: "0" } });
  cases.push({ category: "basic", description: "0 + 1", inputs: { a: "0", b: "1" } });
  cases.push({ category: "basic", description: "1 + 0", inputs: { a: "1", b: "0" } });
  cases.push({ category: "basic", description: "1 + 1", inputs: { a: "1", b: "1" } });
  cases.push({ category: "basic", description: "111 + 1", inputs: { a: "111", b: "1" } });
  cases.push({ category: "basic", description: "1000 + 1", inputs: { a: "1000", b: "1" } });
  cases.push({ category: "basic", description: "101 + 10", inputs: { a: "101", b: "10" } });
  cases.push({ category: "basic", description: "Equal lengths no carry", inputs: { a: "10101", b: "01010" } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    const a = "1".repeat(len);
    const b = "1";
    cases.push({ category: "edge", description: `Cascade carry ${len} ones + 1`, inputs: { a, b } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const lenA = i * 4;
    const lenB = (i % 2 === 0) ? lenA : lenA - 3;
    const a = randBinary(rng, lenA);
    const b = randBinary(rng, lenB);
    cases.push({ category: "boundary", description: `Boundary lengths ${lenA} and ${lenB}`, inputs: { a, b } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const lenA = randomInt(rng, 10, 200);
    const lenB = randomInt(rng, 10, 200);
    const a = randBinary(rng, lenA);
    const b = randBinary(rng, lenB);
    cases.push({ category: "random", description: `Random binary addition ${i}`, inputs: { a, b } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const len = 3000;
    const a = randBinary(rng, len);
    const b = randBinary(rng, len);
    cases.push({ category: "stress", description: `Large strings length 3000`, inputs: { a, b } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    const len = 2500;
    const a = "1".repeat(len);
    const b = "1".repeat(len);
    cases.push({ category: "adversarial", description: `All ones addition length ${len}`, inputs: { a, b } });
  }

  return cases;
}
