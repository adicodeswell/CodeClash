export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeros++;
      if (zeros > 1) break;
      max = Math.max(max, j - i);
    }
  }
  return max;
}
