import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "()" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "()[]{}" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "(]" } });
  cases.push({ category: "basic", description: "Single open", inputs: { s: "(" } });
  cases.push({ category: "basic", description: "Single close", inputs: { s: ")" } });
  cases.push({ category: "basic", description: "Nested all", inputs: { s: "{[()]}" } });
  cases.push({ category: "basic", description: "Mixed valid", inputs: { s: "({[]})[]" } });
  cases.push({ category: "basic", description: "Mismatched close", inputs: { s: "([)]" } });
  cases.push({ category: "basic", description: "Extra close at end", inputs: { s: "()[]}" } });
  cases.push({ category: "basic", description: "Extra open at start", inputs: { s: "{(())}" } });

  function makeValid(pairs) {
    let s = "";
    const openTypes = ["(", "{", "["];
    const closeTypes = [")", "}", "]"];
    const stack = [];
    for (let i = 0; i < pairs; i++) {
      const type = randomInt(rng, 0, 2);
      s += openTypes[type];
      stack.push(closeTypes[type]);
      if (randomInt(rng, 0, 1) === 1 && stack.length > 0) {
        s += stack.pop();
      }
    }
    while (stack.length > 0) s += stack.pop();
    return s;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(3 + (i % 4));
    if (!valid) s = s + (i % 2 === 0 ? "]" : "(");
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(8);
    if (!valid) s = "(" + s;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(randomInt(rng, 10, 25));
    if (!valid) {
      const pos = randomInt(rng, 0, s.length - 1);
      s = s.slice(0, pos) + (s[pos] === "(" ? "}" : "(") + s.slice(pos + 1);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(randomInt(rng, 50, 150));
    if (!valid) s = s.slice(0, -1);
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}
