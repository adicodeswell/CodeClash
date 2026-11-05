import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { tokens: ["2", "1", "+", "3", "*"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { tokens: ["4", "13", "5", "/", "+"] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { tokens: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] } });
  cases.push({ category: "basic", description: "Single number", inputs: { tokens: ["18"] } });
  cases.push({ category: "basic", description: "Negative number", inputs: { tokens: ["-4"] } });
  cases.push({ category: "basic", description: "Subtraction", inputs: { tokens: ["5", "3", "-"] } });
  cases.push({ category: "basic", description: "Division truncating negative", inputs: { tokens: ["-7", "2", "/"] } });
  cases.push({ category: "basic", description: "Multiplication", inputs: { tokens: ["6", "-2", "*"] } });
  cases.push({ category: "basic", description: "Chained addition", inputs: { tokens: ["1", "2", "+", "3", "+", "4", "+"] } });
  cases.push({ category: "basic", description: "All operators", inputs: { tokens: ["3", "4", "+", "2", "*", "7", "/"] } });

  function makeExpression(opCount) {
    const tokens = [String(randomInt(rng, 1, 10)), String(randomInt(rng, 1, 10))];
    const ops = ["+", "-", "*", "/"];
    tokens.push(ops[randomInt(rng, 0, 3)]);
    for (let i = 1; i < opCount; i++) {
      tokens.push(String(randomInt(rng, 1, 10)));
      tokens.push(ops[randomInt(rng, 0, 3)]);
    }
    return tokens;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { tokens: makeExpression(2 + (i % 3)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { tokens: makeExpression(5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { tokens: makeExpression(randomInt(rng, 4, 10)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { tokens: makeExpression(randomInt(rng, 15, 30)) } });
  }

  return cases;
}
