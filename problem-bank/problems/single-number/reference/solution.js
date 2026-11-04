// Optimal O(N) time, O(1) space XOR bitwise reduction for Single Number.
export function solve(nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result ^= nums[i];
  }
  return result;
}
