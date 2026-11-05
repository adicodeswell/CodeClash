function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === "null") return null;
  const root = { val: parseInt(arr[0], 10), left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== "null") {
      node.left = { val: parseInt(arr[i], 10), left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== "null") {
      node.right = { val: parseInt(arr[i], 10), left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function findLCA(node, p, q) {
  if (!node || node.val === p || node.val === q) return node;
  const left = findLCA(node.left, p, q);
  const right = findLCA(node.right, p, q);
  if (left && right) return node;
  return left || right;
}

export function solve(root, p, q) {
  const tree = buildTree(root);
  const lca = findLCA(tree, p, q);
  return lca ? lca.val : -1;
}
