export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      max = Math.max(max, nums[i] ^ nums[j]);
    }
  }
  return max;
}