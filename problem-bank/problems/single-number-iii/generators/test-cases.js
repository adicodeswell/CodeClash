export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 1, 3, 2, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [-1, 0] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Two negatives", inputs: { nums: [-5, -10] } });
  cases.push({ category: "basic", description: "Duplicates surround", inputs: { nums: [4, 4, 1, 2, 3, 3] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { nums: [10, 20, 10, 30, 40, 40] } });
  cases.push({ category: "basic", description: "Large values", inputs: { nums: [100000, 200000, 100000, 300000] } });
  cases.push({ category: "basic", description: "Neg and Pos", inputs: { nums: [-100, 100, 5, 5, 2, 2] } });
  cases.push({ category: "basic", description: "Adjacent unique", inputs: { nums: [7, 8, 9, 9] } });
  cases.push({ category: "basic", description: "Spread out", inputs: { nums: [1, 2, 3, 1, 4, 3] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const nums = [i + 1, i + 2];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums = [-(i * 2 + 1), -(i * 2 + 2)];
    for (let j = 1; j <= i + 1; j++) {
      nums.push(j * 100, j * 100);
    }
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const u1 = (i * 17) + 1;
    const u2 = (i * 19) + 2;
    const nums = [u1, u2];
    const pairs = (i % 10) + 1;
    for (let p = 0; p < pairs; p++) {
      const v = 500 + p * 3;
      nums.push(v, v);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const nums = [777, 888];
    for (let j = 0; j < 200; j++) {
      nums.push(j + 1000, j + 1000);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}