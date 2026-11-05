export function solve(nums, goal) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      s += nums[j];
      if (s === goal) ans++;
      else if (s > goal) break;
    }
  }
  return ans;
}
