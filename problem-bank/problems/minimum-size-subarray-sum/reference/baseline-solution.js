export function solve(target, nums) {
  let min = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      s += nums[j];
      if (s >= target) {
        min = Math.min(min, j - i + 1);
        break;
      }
    }
  }
  return min === Infinity ? 0 : min;
}
