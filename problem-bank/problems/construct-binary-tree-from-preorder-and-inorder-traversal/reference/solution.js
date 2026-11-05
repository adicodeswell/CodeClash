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

export function solve(preorder, inorder) {
  const inMap = new Map();
  for (let i = 0; i < inorder.length; i++) inMap.set(inorder[i], i);
  let preIdx = 0;
  function build(left, right) {
    if (left > right) return null;
    const val = preorder[preIdx++];
    const root = new TreeNode(val);
    const mid = inMap.get(val);
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);
    return root;
  }
  const root = build(0, inorder.length - 1);
  return serializeTree(root);
}
