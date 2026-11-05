export function solve(nums, k) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeros++;
      if (zeros > k) break;
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
