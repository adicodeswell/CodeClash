export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "123 -> 321", inputs: { x: 123 } });
  cases.push({ category: "basic", description: "-123 -> -321", inputs: { x: -123 } });
  cases.push({ category: "basic", description: "120 -> 21", inputs: { x: 120 } });
  cases.push({ category: "basic", description: "0 -> 0", inputs: { x: 0 } });
  cases.push({ category: "basic", description: "1534236469 -> 0 (overflow)", inputs: { x: 1534236469 } });
  cases.push({ category: "basic", description: "-2147483412 -> -2143847412", inputs: { x: -2147483412 } });
  cases.push({ category: "basic", description: "1 -> 1", inputs: { x: 1 } });
  cases.push({ category: "basic", description: "-1 -> -1", inputs: { x: -1 } });
  cases.push({ category: "basic", description: "10 -> 1", inputs: { x: 10 } });
  cases.push({ category: "basic", description: "100 -> 1", inputs: { x: 100 } });

  // Edge (10 - 24)
  for (let i = 10; i < 18; i++) {
    const val = Math.pow(10, i - 10);
    cases.push({ category: "edge", description: "Power of 10 " + val, inputs: { x: val } });
  }
  for (let i = 18; i < 25; i++) {
    const val = -Math.pow(10, i - 18);
    cases.push({ category: "edge", description: "Negative power of 10 " + val, inputs: { x: val } });
  }

  // Corner (25 - 39)
  // Overflows
  const overflowVals = [
    2147483647, -2147483648, 1534236469, -1563847412,
    1999999999, -1999999999, 1463847412, -1463847412,
    2147483641, -2147483641, 1000000003, -1000000003,
    1000000009, -1000000009, 2000000002
  ];
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Near boundary " + i, inputs: { x: overflowVals[i - 25] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const sign = Math.random() < 0.5 ? -1 : 1;
    const x = sign * Math.floor(Math.random() * 1000000);
    cases.push({ category: "random", description: "Random " + i, inputs: { x } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    const x = sign * (100000000 + (i - 65) * 5000000);
    cases.push({ category: "large", description: "Large " + i, inputs: { x } });
  }

  return cases;
}
