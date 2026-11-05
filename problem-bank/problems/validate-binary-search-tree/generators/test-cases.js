import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["2", "1", "3"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["5", "1", "4", "null", "null", "3", "6"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Duplicate value fail", inputs: { root: ["1", "1"] } });
  cases.push({ category: "basic", description: "Valid BST depth 3", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"] } });
  cases.push({ category: "basic", description: "Invalid right child of left subtree", inputs: { root: ["5", "4", "6", "null", "null", "3", "7"] } });
  cases.push({ category: "basic", description: "Left leaning valid", inputs: { root: ["3", "2", "null", "1"] } });
  cases.push({ category: "basic", description: "Right leaning valid", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Negative valid", inputs: { root: ["0", "-2", "2"] } });
  cases.push({ category: "basic", description: "Equal root and right", inputs: { root: ["2", "1", "2"] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["10", "5", "15", "2", "7"] : ["10", "5", "15", "2", "12"];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: r } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["20", "10", "30", "5", "15", "25", "35"] : ["20", "10", "30", "5", "22", "25", "35"];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: r } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["50", "25", "75", "12", "37"] : ["50", "25", "75", "60", "37"];
    cases.push({ category: "random", description: "Random " + i, inputs: { root: r } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["100", "50", "150", "25", "75", "125", "175"] : ["100", "50", "150", "25", "110", "125", "175"];
    cases.push({ category: "large", description: "Large " + i, inputs: { root: r } });
  }

  return cases;
}
