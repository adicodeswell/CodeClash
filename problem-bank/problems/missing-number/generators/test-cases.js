export function generateCases({ rng }) {
  const cases = [];

  // Helper to create permutation missing target
  function makeMissing(n, missing) {
    const arr = [];
    for (let i = 0; i <= n; i++) {
      if (i !== missing) arr.push(i);
    }
    // Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 0, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] } });
  cases.push({ category: "basic", description: "Missing 0", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Missing 1", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "Missing 2", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Missing 0 in 3", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Missing 3 in 3", inputs: { nums: [0, 1, 2] } });
  cases.push({ category: "basic", description: "Missing 1 in 3", inputs: { nums: [0, 2, 3] } });
  cases.push({ category: "basic", description: "Missing 2 in 4", inputs: { nums: [0, 1, 3, 4] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const n = i - 8;
    const missing = (i % 2 === 0) ? 0 : n;
    cases.push({ category: "edge", description: "Missing boundary " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const n = i - 20;
    const missing = Math.floor(n / 2);
    cases.push({ category: "corner", description: "Missing midpoint " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = 10 + (i % 20);
    const missing = Math.floor(Math.random() * (n + 1));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 100 + (i - 65) * 20;
    const missing = Math.floor(Math.random() * (n + 1));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  return cases;
}
