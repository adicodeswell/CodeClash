export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { senate: "RD" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { senate: "RDD" } });
  cases.push({ category: "basic", description: "Single R", inputs: { senate: "R" } });
  cases.push({ category: "basic", description: "Single D", inputs: { senate: "D" } });
  cases.push({ category: "basic", description: "All R", inputs: { senate: "RRRR" } });
  cases.push({ category: "basic", description: "All D", inputs: { senate: "DDDD" } });
  cases.push({ category: "basic", description: "Alternating", inputs: { senate: "RDRD" } });
  cases.push({ category: "basic", description: "DRDR", inputs: { senate: "DRDR" } });
  cases.push({ category: "basic", description: "DDRRR", inputs: { senate: "DDRRR" } });
  cases.push({ category: "basic", description: "RRDDD", inputs: { senate: "RRDDD" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const senate = "R".repeat(i + 1) + "D".repeat(i + 2);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { senate } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const senate = i % 2 === 0 ? "R".repeat(i + 2) : "D".repeat(i + 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { senate } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 4;
    const senate = Array.from({ length: len }, () => Math.random() < 0.5 ? "R" : "D").join('');
    cases.push({ category: "random", description: "Random " + i, inputs: { senate } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const senate = Array.from({ length: len }, (_, idx) => idx % 2 === 0 ? "R" : "D").join('');
    cases.push({ category: "large", description: "Large " + i, inputs: { senate } });
  }

  return cases;
}