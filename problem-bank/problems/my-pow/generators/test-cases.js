export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "2^10", inputs: { x: 2.0, n: 10 } });
  cases.push({ category: "basic", description: "2.1^3", inputs: { x: 2.1, n: 3 } });
  cases.push({ category: "basic", description: "2^-2", inputs: { x: 2.0, n: -2 } });
  cases.push({ category: "basic", description: "1^0", inputs: { x: 1.0, n: 0 } });
  cases.push({ category: "basic", description: "1^100", inputs: { x: 1.0, n: 100 } });
  cases.push({ category: "basic", description: "(-1)^100", inputs: { x: -1.0, n: 100 } });
  cases.push({ category: "basic", description: "(-1)^101", inputs: { x: -1.0, n: 101 } });
  cases.push({ category: "basic", description: "0.5^4", inputs: { x: 0.5, n: 4 } });
  cases.push({ category: "basic", description: "3^4", inputs: { x: 3.0, n: 4 } });
  cases.push({ category: "basic", description: "(-2)^3", inputs: { x: -2.0, n: 3 } });

  // Edge (10 - 24)
  for (let i = 10; i < 21; i++) {
    const exp = i - 15;
    cases.push({ category: "edge", description: "1^exp " + exp, inputs: { x: 1.0, n: exp } });
  }
  cases.push({ category: "edge", description: "0.5^-3", inputs: { x: 0.5, n: -3 } });
  cases.push({ category: "edge", description: "4^-2", inputs: { x: 4.0, n: -2 } });
  cases.push({ category: "edge", description: "(-2)^-3", inputs: { x: -2.0, n: -3 } });
  cases.push({ category: "edge", description: "(-2)^-2", inputs: { x: -2.0, n: -2 } });

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "(-1)^i " + i, inputs: { x: -1.0, n: i } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const base = Number(((Math.random() * 4) - 2).toFixed(2));
    const cleanBase = Math.abs(base) < 0.2 ? (base < 0 ? -0.5 : 0.5) : base;
    const exp = (i % 9) - 4;
    cases.push({ category: "random", description: "Random " + i, inputs: { x: cleanBase, n: exp } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const base = 1.0 + Number((0.01 * ((i - 64) % 10)).toFixed(2));
    const exp = 5 + (i - 65) * 2;
    cases.push({ category: "large", description: "Large " + i, inputs: { x: base, n: exp } });
  }

  return cases;
}
