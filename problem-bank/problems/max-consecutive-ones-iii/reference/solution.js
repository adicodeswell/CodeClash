export function solve(nums, k) {
  let l = 0, zeros = 0, max = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeros++;
    while (zeros > k) {
      if (nums[l] === 0) zeros--;
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}
