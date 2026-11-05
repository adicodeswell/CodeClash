export function solve(calories, k, lower, upper) {
  let points = 0;
  for (let i = 0; i <= calories.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += calories[j];
    if (s < lower) points--;
    else if (s > upper) points++;
  }
  return points;
}
