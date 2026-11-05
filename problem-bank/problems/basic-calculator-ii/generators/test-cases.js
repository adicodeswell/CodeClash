export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "3+2*2" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "3/2" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "3+5/2" } });
  cases.push({ category: "basic", description: "Single number", inputs: { s: "42" } });
  cases.push({ category: "basic", description: "Subtraction and division", inputs: { s: "14-3/2" } });
  cases.push({ category: "basic", description: "Consecutive multiplication", inputs: { s: "2*3*4" } });
  cases.push({ category: "basic", description: "Division chain", inputs: { s: "100/2/5" } });
  cases.push({ category: "basic", description: "Mixed expression", inputs: { s: "1+2*3-4/2" } });
  cases.push({ category: "basic", description: "Zero terms", inputs: { s: "0+0*5" } });
  cases.push({ category: "basic", description: "Large numbers", inputs: { s: "1000+200*300" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const s = String((i + 1) * 10) + "/3";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const s = String(i + 1) + "+0";
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (25)
  const ops = ['+', '-', '*', '/'];
  for (let i = 0; i < 25; i++) {
    let s = String(Math.floor(Math.random() * 20) + 1);
    for (let j = 0; j < 4; j++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      const val = Math.floor(Math.random() * 20) + 1;
      s += op + val;
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    let s = "100";
    for (let j = 0; j < 30; j++) {
      s += "+" + (j * 2) + "*2";
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}