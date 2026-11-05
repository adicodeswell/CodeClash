export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abbaca" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "azxxzy" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "No duplicates", inputs: { s: "abcde" } });
  cases.push({ category: "basic", description: "Pair then single", inputs: { s: "aab" } });
  cases.push({ category: "basic", description: "Single then pair", inputs: { s: "baa" } });
  cases.push({ category: "basic", description: "Cascade into single", inputs: { s: "abccbaX" } });
  cases.push({ category: "basic", description: "Alternating pairs", inputs: { s: "aabbccd" } });
  cases.push({ category: "basic", description: "Nested with distinct center", inputs: { s: "abbaX" } });
  cases.push({ category: "basic", description: "Multiple characters", inputs: { s: "mississippi" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const s = "a".repeat((i + 1) * 2) + "z";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const s = "abcdef".slice(0, (i % 5) + 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 4;
    let s = "";
    for (let j = 0; j < len; j++) {
      s += String.fromCharCode(97 + (j % 4));
    }
    s += "z"; // ensure non-empty
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    let s = "";
    for (let j = 0; j < 50; j++) {
      s += "aa";
    }
    s += "winner";
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}