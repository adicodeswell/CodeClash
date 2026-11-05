export function solve(nums, goal) {
  function atMost(target) {
    if (target < 0) return 0;
    let l = 0, sum = 0, res = 0;
    for (let r = 0; r < nums.length; r++) {
      sum += nums[r];
      while (sum > target) {
        sum -= nums[l++];
      }
      res += (r - l + 1);
    }
    return res;
  }
  return atMost(goal) - atMost(goal - 1);
}
