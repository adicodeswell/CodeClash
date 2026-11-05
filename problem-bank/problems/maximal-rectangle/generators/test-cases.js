export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { matrix: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { matrix: [["0"]] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { matrix: [["1"]] } });
  cases.push({ category: "basic", description: "All ones 2x2", inputs: { matrix: [["1","1"],["1","1"]] } });
  cases.push({ category: "basic", description: "All zeros 2x2", inputs: { matrix: [["0","0"],["0","0"]] } });
  cases.push({ category: "basic", description: "Checkerboard", inputs: { matrix: [["1","0"],["0","1"]] } });
  cases.push({ category: "basic", description: "Single row", inputs: { matrix: [["1","1","0","1","1","1"]] } });
  cases.push({ category: "basic", description: "Single col", inputs: { matrix: [["1"],["1"],["0"],["1"]] } });
  cases.push({ category: "basic", description: "3x3 full", inputs: { matrix: [["1","1","1"],["1","1","1"],["1","1","1"]] } });
  cases.push({ category: "basic", description: "L shape", inputs: { matrix: [["1","0","0"],["1","0","0"],["1","1","1"]] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const matrix = [Array.from({ length: len }, (_, idx) => (idx % 2 === 0 ? "1" : "0"))];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { matrix } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const size = (i % 4) + 2;
    const matrix = Array.from({ length: size }, () => Array(size).fill("1"));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { matrix } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const r = (i % 6) + 2;
    const c = ((i + 1) % 6) + 2;
    const matrix = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => (Math.random() < 0.6 ? "1" : "0"))
    );
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const r = 20 + i;
    const c = 20 + i;
    const matrix = Array.from({ length: r }, (_, rowIdx) =>
      Array.from({ length: c }, (_, colIdx) => ((rowIdx + colIdx) % 3 === 0 ? "0" : "1"))
    );
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix } });
  }

  return cases;
}