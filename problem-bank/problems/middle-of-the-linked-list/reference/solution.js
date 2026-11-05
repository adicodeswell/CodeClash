export function solve(head) {
  let slow = 0;
  let fast = 0;
  while (fast < head.length && fast + 1 < head.length) {
    slow++;
    fast += 2;
  }
  return head.slice(slow);
}