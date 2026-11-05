export function solve(nums, k) {
  const result = [];
  const q = []; // stores indices
  for (let i = 0; i < nums.length; i++) {
    while (q.length > 0 && q[0] <= i - k) q.shift();
    while (q.length > 0 && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);
    if (i >= k - 1) result.push(nums[q[0]]);
  }
  return result;
}
