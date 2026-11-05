export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    const set = new Set();
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      if (set.has(nums[j])) break;
      set.add(nums[j]);
      s += nums[j];
    }
    max = Math.max(max, s);
  }
  return max;
}
