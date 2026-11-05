export function solve(nums, p) {
  let total = 0;
  for (const x of nums) total = (total + x) % p;
  if (total === 0) return 0;

  const target = total;
  const map = new Map();
  map.set(0, -1);
  let cur = 0, minLen = nums.length;

  for (let i = 0; i < nums.length; i++) {
    cur = (cur + nums[i]) % p;
    const need = (cur - target + p) % p;
    if (map.has(need)) {
      minLen = Math.min(minLen, i - map.get(need));
    }
    map.set(cur, i);
  }

  return minLen === nums.length ? -1 : minLen;
}
