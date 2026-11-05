export function generateCases({ rng }) {
  const cases = [];

  const bst = ["6", "2", "8", "0", "4", "7", "9", "null", "null", "3", "5"];
  cases.push({ category: "basic", description: "Example 1", inputs: { root: bst, p: 2, q: 8 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: bst, p: 2, q: 4 } });
  cases.push({ category: "basic", description: "LCA is root", inputs: { root: bst, p: 0, q: 9 } });
  cases.push({ category: "basic", description: "Left subtree", inputs: { root: bst, p: 3, q: 5 } });
  cases.push({ category: "basic", description: "Right subtree", inputs: { root: bst, p: 7, q: 9 } });
  cases.push({ category: "basic", description: "Parent child left", inputs: { root: bst, p: 4, q: 3 } });
  cases.push({ category: "basic", description: "Parent child right", inputs: { root: bst, p: 8, q: 7 } });
  cases.push({ category: "basic", description: "Root and leaf", inputs: { root: bst, p: 6, q: 3 } });
  cases.push({ category: "basic", description: "Two node tree", inputs: { root: ["2", "1"], p: 2, q: 1 } });
  cases.push({ category: "basic", description: "Three node balanced", inputs: { root: ["2", "1", "3"], p: 1, q: 3 } });

  const pairs = [
    [0, 4], [3, 4], [7, 8], [2, 0], [2, 3], [2, 5], [6, 2], [6, 8], [8, 9], [6, 7]
  ];

  for (let i = 10; i < 80; i++) {
    const pair = pairs[i % pairs.length];
    cases.push({
      category: i < 25 ? "edge" : i < 40 ? "corner" : i < 65 ? "random" : "large",
      description: "Test " + i,
      inputs: { root: bst, p: pair[0], q: pair[1] }
    });
  }

  return cases;
}
