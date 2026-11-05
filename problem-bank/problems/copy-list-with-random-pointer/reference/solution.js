export function solve(nodes) {
  const result = [];
  for (let i = 0; i < nodes.length; i++) {
    result.push([nodes[i][0], nodes[i][1]]);
  }
  return result;
}
