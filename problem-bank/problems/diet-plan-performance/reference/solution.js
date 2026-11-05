export function solve(calories, k, lower, upper) {
  let cur = 0;
  for (let i = 0; i < k; i++) cur += calories[i];
  let points = 0;
  if (cur < lower) points--;
  else if (cur > upper) points++;

  for (let i = k; i < calories.length; i++) {
    cur += calories[i] - calories[i - k];
    if (cur < lower) points--;
    else if (cur > upper) points++;
  }

  return points;
}
