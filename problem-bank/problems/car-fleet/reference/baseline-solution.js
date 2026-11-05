export function solve(target, position, speed) {
  const n = position.length;
  const cars = [];
  for (let i = 0; i < n; i++) {
    cars.push({ pos: position[i], time: (target - position[i]) / speed[i] });
  }
  cars.sort((a, b) => b.pos - a.pos);
  const stack = [];
  for (let i = 0; i < n; i++) {
    const curTime = cars[i].time;
    if (stack.length === 0 || curTime > stack[stack.length - 1]) {
      stack.push(curTime);
    }
  }
  return stack.length;
}
