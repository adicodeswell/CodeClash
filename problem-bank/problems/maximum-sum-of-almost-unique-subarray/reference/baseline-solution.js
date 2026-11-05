export function solve(nums, m, k) {
  let max = 0;
  for (let i = 0; i <= nums.length - k; i++) {
    const set = new Set();
    let s = 0;
    for (let j = i; j < i + k; j++) {
      set.add(nums[j]);
      s += nums[j];
    }
    if (set.size >= m && s > max) max = s;
  }
  return max;
}
