import { randomInt } from "../../../scripts/utils/prng.js";

function makeNested(rng, depth) {
  if (depth <= 0) return randomInt(rng, 1, 20).toString();
  const a = randomInt(rng, 1, 10);
  const b = makeNested(rng, depth - 1);
  const op = randomInt(rng, 0, 1) === 0 ? "+" : "-";
  return `(${a}${op}${b})`;
}

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "1+1" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "2-1+2" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "(1+(4+5+2)-3)+(6+8)" } });
  cases.push({ category: "basic", description: "Single number", inputs: { s: "42" } });
  cases.push({ category: "basic", description: "Unary minus", inputs: { s: "-1" } });
  cases.push({ category: "basic", description: "Negative parenthesized", inputs: { s: "-(2+3)" } });
  cases.push({ category: "basic", description: "Simple parens", inputs: { s: "(1+2)" } });
  cases.push({ category: "basic", description: "Nested parens", inputs: { s: "((3))" } });
  cases.push({ category: "basic", description: "Subtraction chain", inputs: { s: "10-2-3-1" } });
  cases.push({ category: "basic", description: "Parenthesized subtraction", inputs: { s: "10-(2-3)" } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const val = i * 10;
    const s = (i % 2 === 0) ? `(${val}-(${val}-1))` : `-(${val}-(${val}+1))`;
    cases.push({ category: "edge", description: `Edge paren expr ${i}`, inputs: { s } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const s = makeNested(rng, (i % 6) + 1);
    cases.push({ category: "boundary", description: `Boundary nested expr ${i}`, inputs: { s } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    let s = randomInt(rng, 1, 50).toString();
    const ops = randomInt(rng, 3, 10);
    for (let j = 0; j < ops; j++) {
      const op = randomInt(rng, 0, 1) === 0 ? "+" : "-";
      const term = (randomInt(rng, 0, 2) === 0)
        ? `(${randomInt(rng, 1, 20)}${op}${randomInt(rng, 1, 20)})`
        : randomInt(rng, 1, 30).toString();
      s += `${op}${term}`;
    }
    cases.push({ category: "random", description: `Random arithmetic expression ${i}`, inputs: { s } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    let s = "0";
    for (let j = 1; j <= 200; j++) {
      s += (j % 2 === 0 ? "+" : "-") + j.toString();
    }
    cases.push({ category: "stress", description: `Stress 200 operations chain`, inputs: { s } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    const depth = 30;
    const s = "(".repeat(depth) + "100" + ")".repeat(depth);
    cases.push({ category: "adversarial", description: `Adversarial depth ${depth} parens`, inputs: { s } });
  }

  return cases;
}
