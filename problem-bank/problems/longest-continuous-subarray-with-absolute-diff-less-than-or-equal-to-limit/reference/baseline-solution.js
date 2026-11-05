export function solve(nums, limit) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let minVal = nums[i], maxVal = nums[i];
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < minVal) minVal = nums[j];
      if (nums[j] > maxVal) maxVal = nums[j];
      if (maxVal - minVal <= limit) {
        max = Math.max(max, j - i + 1);
      } else {
        break;
      }
    }
  }
  return max;
}
