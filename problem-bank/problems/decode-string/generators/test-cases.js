export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "3[a]2[bc]" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "3[a2[c]]" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "2[abc]3[cd]ef" } });
  cases.push({ category: "basic", description: "Single char repeated", inputs: { s: "4[z]" } });
  cases.push({ category: "basic", description: "No encoding", inputs: { s: "abcdef" } });
  cases.push({ category: "basic", description: "Nested triple", inputs: { s: "2[2[2[a]]]" } });
  cases.push({ category: "basic", description: "Mixed pre post", inputs: { s: "pre2[ab]post" } });
  cases.push({ category: "basic", description: "Single repetition", inputs: { s: "1[abc]" } });
  cases.push({ category: "basic", description: "Two digits count", inputs: { s: "10[a]" } });
  cases.push({ category: "basic", description: "Multiple independent", inputs: { s: "2[a]2[b]2[c]" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const s = (i + 1) + "[x]";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const s = "a" + (i + 1) + "[b]c";
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (25)
  const tokens = ["a", "b", "c", "ab", "xy"];
  for (let i = 0; i < 25; i++) {
    const k1 = (i % 4) + 1;
    const k2 = ((i + 1) % 3) + 1;
    const t1 = tokens[i % tokens.length];
    const t2 = tokens[(i + 2) % tokens.length];
    const s = k1 + "[" + t1 + k2 + "[" + t2 + "]]";
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const s = "2[ab3[c]]4[d]";
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}