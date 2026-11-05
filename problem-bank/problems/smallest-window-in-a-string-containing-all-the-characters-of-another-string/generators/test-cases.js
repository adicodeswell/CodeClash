export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "timetopractice", p: "toc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "zoomlazapzo", p: "oza" } });
  cases.push({ category: "basic", description: "Exact", inputs: { s: "abc", p: "abc" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "abacaba", p: "b" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "hello" + "world".slice(0, i - 3), p: "lo" } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Double chars " + i, inputs: { s: "aabbccddeeff", p: "ac" } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Target at boundary " + i, inputs: { s: "xy" + "a".repeat(i - 20) + "z", p: "xz" } });
  }
  for (let i = 40; i < 65; i++) {
    const p = "abc";
    const filler = "xyz".repeat((i % 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: filler + "acb" + filler, p } });
  }
  for (let i = 65; i < 80; i++) {
    const p = "abcde";
    const filler = "x".repeat(i);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: filler + "edcba" + filler, p } });
  }
  return cases;
}
