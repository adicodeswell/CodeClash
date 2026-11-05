class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === "null") return null;
  const root = new TreeNode(Number(arr[0]));
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== "null") {
      node.left = new TreeNode(Number(arr[i]));
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== "null") {
      node.right = new TreeNode(Number(arr[i]));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function serializeTree(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      res.push(String(node.val));
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push("null");
    }
  }
  while (res.length > 0 && res[res.length - 1] === "null") res.pop();
  return res;
}

export function solve(rootArr, p, q) {
  const root = buildTree(rootArr);
  function findPath(node, val, path) {
    if (!node) return false;
    path.push(node.val);
    if (node.val === val) return true;
    if (findPath(node.left, val, path) || findPath(node.right, val, path)) return true;
    path.pop();
    return false;
  }
  const pathP = [];
  const pathQ = [];
  findPath(root, p, pathP);
  findPath(root, q, pathQ);
  let lca = root.val;
  for (let i = 0; i < Math.min(pathP.length, pathQ.length); i++) {
    if (pathP[i] === pathQ[i]) lca = pathP[i];
    else break;
  }
  return lca;
}
