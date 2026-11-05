export function solve(nums) {
  let l = 0, zeros = 0, max = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeros++;
    while (zeros > 1) {
      if (nums[l] === 0) zeros--;
      l++;
    }
    max = Math.max(max, r - l);
  }
  return max;
}
