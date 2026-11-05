export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "2 * 3", inputs: { num1: "2", num2: "3" } });
  cases.push({ category: "basic", description: "123 * 456", inputs: { num1: "123", num2: "456" } });
  cases.push({ category: "basic", description: "0 * 0", inputs: { num1: "0", num2: "0" } });
  cases.push({ category: "basic", description: "0 * 123", inputs: { num1: "0", num2: "123" } });
  cases.push({ category: "basic", description: "456 * 0", inputs: { num1: "456", num2: "0" } });
  cases.push({ category: "basic", description: "9 * 9", inputs: { num1: "9", num2: "9" } });
  cases.push({ category: "basic", description: "99 * 99", inputs: { num1: "99", num2: "99" } });
  cases.push({ category: "basic", description: "100 * 100", inputs: { num1: "100", num2: "100" } });
  cases.push({ category: "basic", description: "12 * 34", inputs: { num1: "12", num2: "34" } });
  cases.push({ category: "basic", description: "999 * 999", inputs: { num1: "999", num2: "999" } });

  // Edge (10 - 24)
  for (let i = 10; i < 18; i++) {
    const len = i - 9;
    cases.push({ category: "edge", description: "Ones " + len, inputs: { num1: "1".repeat(len), num2: "1".repeat(len) } });
  }
  for (let i = 18; i < 25; i++) {
    const len = i - 17;
    cases.push({ category: "edge", description: "Nines " + len, inputs: { num1: "9".repeat(len), num2: "9".repeat(len) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = (i - 24);
    cases.push({ category: "corner", description: "Powers of 10 " + i, inputs: { num1: "1" + "0".repeat(len), num2: "1" + "0".repeat((i % 4) + 1) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const l1 = 2 + (i % 8);
    const l2 = 2 + ((i * 2) % 8);
    const n1 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l1 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    const n2 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l2 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { num1: n1, num2: n2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const l1 = 20 + (i - 65) * 4;
    const l2 = 20 + (i - 65) * 4;
    const n1 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l1 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    const n2 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l2 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { num1: n1, num2: n2 } });
  }

  return cases;
}
