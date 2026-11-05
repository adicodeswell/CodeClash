export function solve(nums, k) {
  function atMost(target) {
    if (target <= 0) return 0;
    const count = new Map();
    let l = 0, res = 0;
    for (let r = 0; r < nums.length; r++) {
      count.set(nums[r], (count.get(nums[r]) || 0) + 1);
      while (count.size > target) {
        const c = count.get(nums[l]);
        if (c === 1) count.delete(nums[l]);
        else count.set(nums[l], c - 1);
        l++;
      }
      res += (r - l + 1);
    }
    return res;
  }
  return atMost(k) - atMost(k - 1);
}
