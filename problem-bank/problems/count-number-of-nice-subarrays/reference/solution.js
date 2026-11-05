export function solve(nums, k) {
  function atMost(target) {
    if (target < 0) return 0;
    let l = 0, odds = 0, res = 0;
    for (let r = 0; r < nums.length; r++) {
      if (nums[r] % 2 !== 0) odds++;
      while (odds > target) {
        if (nums[l] % 2 !== 0) odds--;
        l++;
      }
      res += (r - l + 1);
    }
    return res;
  }
  return atMost(k) - atMost(k - 1);
}
