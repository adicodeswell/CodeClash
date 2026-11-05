import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "42" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "-042" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "1337c0d3" } });
  cases.push({ category: "basic", description: "Example 4", inputs: { s: "0-1" } });
  cases.push({ category: "basic", description: "Example 5", inputs: { s: "words987" } });
  cases.push({ category: "basic", description: "Empty-like string", inputs: { s: "empty" } });
  cases.push({ category: "basic", description: "Just sign +", inputs: { s: "+" } });
  cases.push({ category: "basic", description: "Just sign -", inputs: { s: "-" } });
  cases.push({ category: "basic", description: "Decimal point", inputs: { s: "3.14159" } });
  cases.push({ category: "basic", description: "Leading zeros", inputs: { s: "00000123" } });

  // Edge (10 - 24)
  cases.push({ category: "edge", description: "Exact INT_MAX", inputs: { s: "2147483647" } });
  cases.push({ category: "edge", description: "Exact INT_MIN", inputs: { s: "-2147483648" } });
  cases.push({ category: "edge", description: "INT_MAX + 1 overflow", inputs: { s: "2147483648" } });
  cases.push({ category: "edge", description: "INT_MIN - 1 underflow", inputs: { s: "-2147483649" } });
  cases.push({ category: "edge", description: "Giant positive number", inputs: { s: "999999999999999999" } });
  cases.push({ category: "edge", description: "Giant negative number", inputs: { s: "-999999999999999999" } });
  cases.push({ category: "edge", description: "Multiple signs +-1", inputs: { s: "+-12" } });
  cases.push({ category: "edge", description: "Sign followed by letters", inputs: { s: "+abc" } });
  cases.push({ category: "edge", description: "Plus and digits", inputs: { s: "+12" } });
  cases.push({ category: "edge", description: "Leading zeros before letters", inputs: { s: "00000abc" } });
  cases.push({ category: "edge", description: "Single zero", inputs: { s: "0" } });
  cases.push({ category: "edge", description: "Single one", inputs: { s: "1" } });
  cases.push({ category: "edge", description: "Negative zero", inputs: { s: "-0" } });
  cases.push({ category: "edge", description: "Plus zero", inputs: { s: "+0" } });
  cases.push({ category: "edge", description: "Zeros followed by large number", inputs: { s: "00000000000000000002147483647" } });

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const val = (i % 2 === 0) ? (2147483640 + (i - 25)) : (-2147483640 - (i - 25));
    cases.push({ category: "boundary", description: `Boundary value ${val}`, inputs: { s: `${val}trailing` } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const sign = randomInt(rng, 0, 2) === 0 ? "-" : (randomInt(rng, 0, 1) === 0 ? "+" : "");
    const digits = randomInt(rng, 0, 1000000000).toString();
    const trail = "extra";
    cases.push({ category: "random", description: `Random string atoi ${i}`, inputs: { s: `${sign}${digits}${trail}` } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const big = "9".repeat(50);
    const sign = (i % 2 === 0) ? "" : "-";
    cases.push({ category: "stress", description: `Stress huge 50-digit number ${i}`, inputs: { s: `${sign}${big}` } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    const zeros = "0".repeat(i);
    cases.push({ category: "adversarial", description: `Adversarial zeros sequence ${i}`, inputs: { s: `+${zeros}456xyz` } });
  }

  return cases;
}
