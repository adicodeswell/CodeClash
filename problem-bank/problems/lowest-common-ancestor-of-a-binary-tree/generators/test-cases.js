import { randomInt } from "../../../scripts/utils/prng.js";

function serializeTree(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length > 0) {
    const node = q.shift();
    if (node) {
      res.push(node.val.toString());
      q.push(node.left);
      q.push(node.right);
    } else {
      res.push("null");
    }
  }
  while (res.length > 0 && res[res.length - 1] === "null") res.pop();
  return res;
}

function makeRandomTree(rng, count) {
  const root = { val: 1, left: null, right: null };
  const available = [root];
  const allNodes = [1];
  for (let i = 2; i <= count; i++) {
    const pIdx = randomInt(rng, 0, available.length - 1);
    const parent = available[pIdx];
    const newNode = { val: i, left: null, right: null };
    if (!parent.left) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
      available.splice(pIdx, 1);
    }
    available.push(newNode);
    allNodes.push(i);
  }
  return { root, vals: allNodes };
}

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  const ex1 = ["3","5","1","6","2","0","8","null","null","7","4"];
  cases.push({ category: "basic", description: "Example 1", inputs: { root: ex1, p: 5, q: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ex1, p: 5, q: 4 } });
  cases.push({ category: "basic", description: "Example 3 (2 nodes)", inputs: { root: ["1","2"], p: 1, q: 2 } });
  cases.push({ category: "basic", description: "3 nodes balanced", inputs: { root: ["2","1","3"], p: 1, q: 3 } });
  cases.push({ category: "basic", description: "Root and right child", inputs: { root: ["2","1","3"], p: 2, q: 3 } });
  cases.push({ category: "basic", description: "Left skewed tree", inputs: { root: ["3","2","null","1"], p: 1, q: 2 } });
  cases.push({ category: "basic", description: "Right skewed tree", inputs: { root: ["1","null","2","null","3"], p: 2, q: 3 } });
  cases.push({ category: "basic", description: "Leaves with common parent", inputs: { root: ex1, p: 7, q: 4 } });
  cases.push({ category: "basic", description: "Subtree root with child leaf", inputs: { root: ex1, p: 2, q: 4 } });
  cases.push({ category: "basic", description: "Opposite tree extremities", inputs: { root: ex1, p: 6, q: 8 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const size = (i % 5) + 3;
    const tree = Array.from({ length: size }, (_, idx) => (idx + 1).toString());
    const p = 2;
    const q = size;
    cases.push({ category: "edge", description: `Edge tree size ${size}`, inputs: { root: tree, p, q } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const count = 15;
    const { root, vals } = makeRandomTree(rng, count);
    const p = vals[1];
    const q = vals[vals.length - 1];
    cases.push({ category: "boundary", description: `Boundary tree ${i}`, inputs: { root: serializeTree(root), p, q } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const count = randomInt(rng, 10, 30);
    const { root, vals } = makeRandomTree(rng, count);
    const pIdx = randomInt(rng, 0, count - 1);
    let qIdx = randomInt(rng, 0, count - 1);
    while (qIdx === pIdx) qIdx = randomInt(rng, 0, count - 1);
    cases.push({
      category: "random",
      description: `Random tree size ${count}`,
      inputs: { root: serializeTree(root), p: vals[pIdx], q: vals[qIdx] }
    });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const count = 100;
    const { root, vals } = makeRandomTree(rng, count);
    const p = vals[randomInt(rng, 0, 40)];
    const q = vals[randomInt(rng, 50, count - 1)];
    cases.push({ category: "stress", description: `Stress tree size ${count}`, inputs: { root: serializeTree(root), p, q } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    // Deep line tree depth 40
    const depth = 40;
    const arr = [];
    for (let d = 1; d <= depth; d++) {
      arr.push(d.toString());
      arr.push("null");
    }
    cases.push({
      category: "adversarial",
      description: `Deep right-skewed adversarial line depth ${depth}`,
      inputs: { root: arr, p: depth, q: Math.floor(depth / 2) }
    });
  }

  return cases;
}
