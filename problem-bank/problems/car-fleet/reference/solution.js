export function solve(target, position, speed) {
  const n = position.length;
  const cars = [];
  for (let i = 0; i < n; i++) {
    cars.push({ pos: position[i], time: (target - position[i]) / speed[i] });
  }
  cars.sort((a, b) => b.pos - a.pos);
  let fleets = 0;
  let maxTime = 0;
  for (let i = 0; i < n; i++) {
    if (cars[i].time > maxTime) {
      fleets++;
      maxTime = cars[i].time;
    }
  }
  return fleets;
}
