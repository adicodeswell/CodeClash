export function solve(nums, target) {
  let count = 0;
  function dfs(idx, cur) {
    if (idx === nums.length) {
      if (cur === target) count++;
      return;
    }
    dfs(idx + 1, cur + nums[idx]);
    dfs(idx + 1, cur - nums[idx]);
  }
  dfs(0, 0);
  return count;
}
