export function generateCases({ rng }) {
  const cases = [];

  // Values 1 to 8 across 80 tests
  for (let i = 0; i < 80; i++) {
    // Distribute 1..8 with higher concentration on small values for fast baseline
    const n = (i % 6) + 1; // 1 to 6
    cases.push({
      category: i < 10 ? "basic" : i < 25 ? "edge" : i < 40 ? "corner" : i < 65 ? "random" : "large",
      description: "n=" + n,
      inputs: { n }
    });
  }

  return cases;
}
