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
  let cur = root;
  while (cur) {
    if (p < cur.val && q < cur.val) cur = cur.left;
    else if (p > cur.val && q > cur.val) cur = cur.right;
    else return cur.val;
  }
  return -1;
}
