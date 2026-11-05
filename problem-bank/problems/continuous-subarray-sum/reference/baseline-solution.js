export function solve(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    let s = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      s += nums[j];
      if (s % k === 0) return true;
    }
  }
  return false;
}
