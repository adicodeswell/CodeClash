export function solve(nums, k) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    const set = new Set();
    for (let j = i; j < nums.length; j++) {
      set.add(nums[j]);
      if (set.size === k) ans++;
      else if (set.size > k) break;
    }
  }
  return ans;
}
