export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { num: "1432219", k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { num: "10200", k: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { num: "10", k: 2 } });
  cases.push({ category: "basic", description: "k is 0", inputs: { num: "12345", k: 0 } });
  cases.push({ category: "basic", description: "Remove all", inputs: { num: "9", k: 1 } });
  cases.push({ category: "basic", description: "Increasing string", inputs: { num: "123456", k: 2 } });
  cases.push({ category: "basic", description: "Decreasing string", inputs: { num: "654321", k: 2 } });
  cases.push({ category: "basic", description: "All zeros after remove", inputs: { num: "1000", k: 1 } });
  cases.push({ category: "basic", description: "Duplicate digits", inputs: { num: "112", k: 1 } });
  cases.push({ category: "basic", description: "Alternating digits", inputs: { num: "121212", k: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const num = "1" + "0".repeat(i + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { num, k: 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const num = Array.from({ length: i + 3 }, (_, idx) => (idx % 9) + 1).join('');
    cases.push({ category: "corner", description: "Corner " + i, inputs: { num, k: i + 2 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    let num = String(Math.floor(Math.random() * 9) + 1);
    for (let j = 1; j < len; j++) {
      num += String(Math.floor(Math.random() * 10));
    }
    const k = Math.floor(Math.random() * (len - 1)) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { num, k } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    let num = "9";
    for (let j = 0; j < 300; j++) {
      num += String((j * 7) % 10);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { num, k: 50 + i * 5 } });
  }

  return cases;
}