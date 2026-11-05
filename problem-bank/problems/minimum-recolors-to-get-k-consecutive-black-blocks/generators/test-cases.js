export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { blocks: "WBBWWBBWBW", k: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { blocks: "WBWBBBW", k: 2 } });
  cases.push({ category: "basic", description: "All black", inputs: { blocks: "BBBB", k: 2 } });
  cases.push({ category: "basic", description: "All white", inputs: { blocks: "WWWW", k: 3 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { blocks: "BWBW".repeat(i), k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { blocks: "W".repeat(i - 8) + "B", k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { blocks: "B".repeat(len), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 20);
    const blocks = Array.from({ length: len }, () => (Math.random() < 0.5 ? "W" : "B")).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { blocks, k: 3 + (i % 7) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 50 + (i - 65) * 3;
    const blocks = Array.from({ length: len }, () => (Math.random() < 0.4 ? "W" : "B")).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { blocks, k: 10 + (i % 15) } });
  }
  return cases;
}
