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

function getPath(node, target, path) {
  if (!node) return false;
  path.push(node.val);
  if (node.val === target) return true;
  if (getPath(node.left, target, path) || getPath(node.right, target, path)) return true;
  path.pop();
  return false;
}

export function solve(root, p, q) {
  const tree = buildTree(root);
  const pathP = [];
  const pathQ = [];
  getPath(tree, p, pathP);
  getPath(tree, q, pathQ);

  let lca = -1;
  const minLen = Math.min(pathP.length, pathQ.length);
  for (let i = 0; i < minLen; i++) {
    if (pathP[i] === pathQ[i]) lca = pathP[i];
    else break;
  }
  return lca;
}
