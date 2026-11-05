export function solve(nums, k) {
  let maxVal = -Infinity;
  for (const x of nums) if (x > maxVal) maxVal = x;
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let c = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === maxVal) c++;
      if (c >= k) {
        ans += (nums.length - j);
        break;
      }
    }
  }
  return ans;
}
