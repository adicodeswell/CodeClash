export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "1", "4", "null", "2"], k: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["5", "3", "6", "2", "4", "null", "null", "1"], k: 3 } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["10"], k: 1 } });
  cases.push({ category: "basic", description: "k = n", inputs: { root: ["3", "1", "4", "null", "2"], k: 4 } });
  cases.push({ category: "basic", description: "Full BST k=1", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"], k: 1 } });
  cases.push({ category: "basic", description: "Full BST k=7", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"], k: 7 } });
  cases.push({ category: "basic", description: "Full BST k=4", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"], k: 4 } });
  cases.push({ category: "basic", description: "Left chain", inputs: { root: ["5", "4", "null", "3", "null", "2", "null", "1"], k: 2 } });
  cases.push({ category: "basic", description: "Right chain", inputs: { root: ["1", "null", "2", "null", "3", "null", "4"], k: 3 } });
  cases.push({ category: "basic", description: "Two elements k=2", inputs: { root: ["2", "1"], k: 2 } });

  const bst7 = ["4", "2", "6", "1", "3", "5", "7"];
  for (let i = 10; i < 80; i++) {
    const k = (i % 7) + 1;
    cases.push({
      category: i < 25 ? "edge" : i < 40 ? "corner" : i < 65 ? "random" : "large",
      description: "k=" + k,
      inputs: { root: bst7, k }
    });
  }

  return cases;
}
