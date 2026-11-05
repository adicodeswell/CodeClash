export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0, ones = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeros++;
      else ones++;
      if (zeros === ones) max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
