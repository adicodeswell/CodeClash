export function solve(nums) {
  const n = nums.length;
  const set = new Set();
  const triplets = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const trip = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const key = trip.join(",");
          if (!set.has(key)) {
            set.add(key);
            triplets.push(trip);
          }
        }
      }
    }
  }
  triplets.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });
  return triplets;
}
