export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { inputs: [1, 100, 3001, 3002] } });
  cases.push({ category: "basic", description: "Single", inputs: { inputs: [1000] } });
  cases.push({ category: "basic", description: "Within 3000", inputs: { inputs: [10, 20, 30, 40, 50] } });
  cases.push({ category: "basic", description: "Far apart", inputs: { inputs: [1000, 5000, 10000, 15000] } });
  cases.push({ category: "basic", description: "Two close", inputs: { inputs: [500, 600] } });
  cases.push({ category: "basic", description: "Two far", inputs: { inputs: [500, 4000] } });
  cases.push({ category: "basic", description: "Exact 3000 delta", inputs: { inputs: [1000, 4000, 7000] } });
  cases.push({ category: "basic", description: "Dense sequence", inputs: { inputs: [1, 2, 3, 4, 5, 6, 7] } });
  cases.push({ category: "basic", description: "Burst then silence", inputs: { inputs: [10, 20, 30, 4000] } });
  cases.push({ category: "basic", description: "Steady ramp", inputs: { inputs: [500, 1500, 2500, 3500, 4500] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const inputs = Array.from({ length: i + 1 }, (_, idx) => (idx + 1) * 100);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { inputs } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const inputs = Array.from({ length: 5 }, (_, idx) => (idx + 1) * 5000 + i);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { inputs } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const inputs = [];
    let cur = 100;
    for (let j = 0; j < len; j++) {
      cur += Math.floor(Math.random() * 800) + 1;
      inputs.push(cur);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { inputs } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const inputs = Array.from({ length: len }, (_, idx) => (idx + 1) * 20);
    cases.push({ category: "large", description: "Large " + i, inputs: { inputs } });
  }

  return cases;
}