export function solve(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  function helper(start, end) {
    let prev2 = 0, prev1 = 0;
    for (let i = start; i <= end; i++) {
      const cur = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  }

  return Math.max(helper(0, nums.length - 2), helper(1, nums.length - 1));
}
