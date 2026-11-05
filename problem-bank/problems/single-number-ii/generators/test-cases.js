export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 2, 3, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 0, 1, 0, 1, 99] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [42] } });
  cases.push({ category: "basic", description: "Negative single", inputs: { nums: [-4, -4, -4, -2] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [i, i, i, 100] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero single " + i, inputs: { nums: [i, i, i, 0] } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: [10, 10, 10, -i] } });
  }
  for (let i = 40; i < 65; i++) {
    const triplets = 3 + (i % 5);
    const arr = [999];
    for (let t = 0; t < triplets; t++) {
      const val = (t + 1) * 7;
      arr.push(val, val, val);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: arr } });
  }
  for (let i = 65; i < 80; i++) {
    const triplets = 20 + (i - 65) * 5;
    const arr = [12345];
    for (let t = 0; t < triplets; t++) {
      const val = (t + 1) * 11;
      arr.push(val, val, val);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: arr } });
  }
  return cases;
}
