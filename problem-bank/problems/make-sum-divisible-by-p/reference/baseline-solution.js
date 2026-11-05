export function solve(nums, p) {
  let total = 0;
  for (const x of nums) total += x;
  if (total % p === 0) return 0;

  let minLen = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let subSum = 0;
    for (let j = i; j < nums.length; j++) {
      if (j - i + 1 === nums.length) continue;
      subSum += nums[j];
      if ((total - subSum) % p === 0) {
        minLen = Math.min(minLen, j - i + 1);
      }
    }
  }
  return minLen === Infinity ? -1 : minLen;
}
