export function solve(nums, k) {
  let maxVal = -Infinity;
  for (const x of nums) if (x > maxVal) maxVal = x;
  let count = 0, l = 0, ans = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === maxVal) count++;
    while (count >= k) {
      if (nums[l] === maxVal) count--;
      l++;
    }
    ans += l;
  }
  return ans;
}
