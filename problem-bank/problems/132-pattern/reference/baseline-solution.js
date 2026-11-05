export function solve(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        for (let k = j + 1; k < nums.length; k++) {
          if (nums[i] < nums[k] && nums[k] < nums[j]) {
            return true;
          }
        }
      }
    }
  }
  return false;
}