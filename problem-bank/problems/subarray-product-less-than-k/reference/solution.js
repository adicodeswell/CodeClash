export function solve(nums, k) {
  if (k <= 1) return 0;
  let prod = 1, l = 0, count = 0;
  for (let r = 0; r < nums.length; r++) {
    prod *= nums[r];
    while (prod >= k && l <= r) {
      prod /= nums[l++];
    }
    count += (r - l + 1);
  }
  return count;
}
