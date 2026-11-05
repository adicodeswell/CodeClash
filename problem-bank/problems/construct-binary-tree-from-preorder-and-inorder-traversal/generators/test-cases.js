import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { preorder: [-1], inorder: [-1] } });
  cases.push({ category: "basic", description: "Two elements left", inputs: { preorder: [1, 2], inorder: [2, 1] } });
  cases.push({ category: "basic", description: "Two elements right", inputs: { preorder: [1, 2], inorder: [1, 2] } });
  cases.push({ category: "basic", description: "Three balanced", inputs: { preorder: [1, 2, 3], inorder: [2, 1, 3] } });
  cases.push({ category: "basic", description: "Left chain", inputs: { preorder: [3, 2, 1], inorder: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Right chain", inputs: { preorder: [1, 2, 3], inorder: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Four nodes", inputs: { preorder: [1, 2, 4, 3], inorder: [4, 2, 1, 3] } });
  cases.push({ category: "basic", description: "Five nodes", inputs: { preorder: [1, 2, 4, 5, 3], inorder: [4, 2, 5, 1, 3] } });
  cases.push({ category: "basic", description: "Full depth 3", inputs: { preorder: [4, 2, 1, 3, 6, 5, 7], inorder: [1, 2, 3, 4, 5, 6, 7] } });

  function makeTree(n) {
    const vals = [];
    for (let i = 1; i <= n; i++) vals.push(i * 10);
    // Construct random BST
    const pre = [];
    const inord = [...vals];
    function bst(l, r) {
      if (l > r) return;
      const m = Math.floor((l + r) / 2);
      pre.push(inord[m]);
      bst(l, m - 1);
      bst(m + 1, r);
    }
    bst(0, n - 1);
    return { preorder: pre, inorder: inord };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeTree(3 + (i % 4)) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeTree(7) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeTree(randomInt(rng, 8, 15)) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeTree(randomInt(rng, 16, 30)) });
  }

  return cases;
}
