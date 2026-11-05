export function solve(asteroids) {
  const res = [];
  for (let i = 0; i < asteroids.length; i++) {
    const a = asteroids[i];
    let exploded = false;
    while (res.length > 0 && a < 0 && res[res.length - 1] > 0) {
      const top = res[res.length - 1];
      if (top < -a) {
        res.pop();
      } else if (top === -a) {
        res.pop();
        exploded = true;
        break;
      } else {
        exploded = true;
        break;
      }
    }
    if (!exploded) {
      res.push(a);
    }
  }
  return res;
}