export function solve(heights, bricks, ladders) {
  // Simple binary search or min-heap simulation
  let low = 0;
  let high = heights.length - 1;
  let ans = 0;

  function canReach(target) {
    const climbs = [];
    for (let i = 0; i < target; i++) {
      const diff = heights[i + 1] - heights[i];
      if (diff > 0) climbs.push(diff);
    }
    climbs.sort((a, b) => b - a); // largest climbs first
    // Use ladders for the largest climbs
    let brickNeeded = 0;
    for (let i = ladders; i < climbs.length; i++) {
      brickNeeded += climbs[i];
      if (brickNeeded > bricks) return false;
    }
    return true;
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canReach(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
}