export function solve(head) {
  const rev = head.slice().reverse();
  for (let i = 0; i < head.length; i++) {
    if (head[i] !== rev[i]) return false;
  }
  return true;
}