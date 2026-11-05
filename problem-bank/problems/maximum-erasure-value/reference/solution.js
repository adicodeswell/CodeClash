export function solve(nums) {
  const set = new Set();
  let l = 0, sum = 0, max = 0;
  for (let r = 0; r < nums.length; r++) {
    while (set.has(nums[r])) {
      set.delete(nums[l]);
      sum -= nums[l];
      l++;
    }
    set.add(nums[r]);
    sum += nums[r];
    max = Math.max(max, sum);
  }
  return max;
}
