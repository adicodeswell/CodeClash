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
  if (preorder.length === 0) return [];
  const val = preorder[0];
  const root = new TreeNode(val);
  const mid = inorder.indexOf(val);
  const inLeft = inorder.slice(0, mid);
  const inRight = inorder.slice(mid + 1);
  const preLeft = preorder.slice(1, 1 + inLeft.length);
  const preRight = preorder.slice(1 + inLeft.length);

  function rec(p, i) {
    if (p.length === 0) return null;
    const v = p[0];
    const node = new TreeNode(v);
    const m = i.indexOf(v);
    node.left = rec(p.slice(1, 1 + m), i.slice(0, m));
    node.right = rec(p.slice(1 + m), i.slice(m + 1));
    return node;
  }
  const r = rec(preorder, inorder);
  return serializeTree(r);
}
