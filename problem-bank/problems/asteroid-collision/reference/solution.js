export function solve(asteroids) {
  const stack = [];
  for (const ast of asteroids) {
    let alive = true;
    while (alive && ast < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -ast) {
        stack.pop();
      } else if (top === -ast) {
        stack.pop();
        alive = false;
      } else {
        alive = false;
      }
    }
    if (alive) {
      stack.push(ast);
    }
  }
  return stack;
}