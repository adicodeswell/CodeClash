export function solve(nums) {
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i % n]) {
      stack.pop();
    }
    if (i < n) {
      if (stack.length > 0) res[i] = stack[stack.length - 1];
    }
    stack.push(nums[i % n]);
  }
  return res;
}
