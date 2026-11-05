export function solve(nums, k) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let odds = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] % 2 !== 0) odds++;
      if (odds === k) ans++;
      else if (odds > k) break;
    }
  }
  return ans;
}
