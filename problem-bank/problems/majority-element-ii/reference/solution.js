export function solve(nums) {
  let c1 = 0, c2 = 0, n1 = null, n2 = null;
  for (const num of nums) {
    if (num === n1) c1++;
    else if (num === n2) c2++;
    else if (c1 === 0) { n1 = num; c1 = 1; }
    else if (c2 === 0) { n2 = num; c2 = 1; }
    else { c1--; c2--; }
  }
  const threshold = Math.floor(nums.length / 3);
  const res = [];
  let cnt1 = 0, cnt2 = 0;
  for (const num of nums) {
    if (num === n1) cnt1++;
    else if (num === n2) cnt2++;
  }
  if (cnt1 > threshold) res.push(n1);
  if (cnt2 > threshold) res.push(n2);
  return res.sort((a, b) => a - b);
}
