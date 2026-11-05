export function solve(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let sum = 0, count = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    let rem = ((sum % k) + k) % k;
    const prev = map.get(rem) || 0;
    count += prev;
    map.set(rem, prev + 1);
  }
  return count;
}
