export function solve(heights, bricks, ladders) {
  for (let i = 0; i < heights.length - 1; i++) {
    // Check if can reach i + 1
    const climbs = [];
    for (let j = 0; j <= i; j++) {
      const diff = heights[j + 1] - heights[j];
      if (diff > 0) climbs.push(diff);
    }
    climbs.sort((a, b) => a - b);
    let needed = 0;
    for (let k = 0; k < climbs.length - ladders; k++) {
      needed += climbs[k];
    }
    if (needed > bricks) {
      return i;
    }
  }
  return heights.length - 1;
}