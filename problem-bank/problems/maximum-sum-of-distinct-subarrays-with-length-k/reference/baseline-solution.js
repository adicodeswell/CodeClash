export function solve(nums, k) {
  let max = 0;
  for (let i = 0; i <= nums.length - k; i++) {
    const set = new Set();
    let s = 0;
    let distinct = true;
    for (let j = i; j < i + k; j++) {
      if (set.has(nums[j])) {
        distinct = false;
        break;
      }
      set.add(nums[j]);
      s += nums[j];
    }
    if (distinct && s > max) max = s;
  }
  return max;
}
