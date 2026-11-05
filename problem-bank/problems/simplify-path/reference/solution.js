export function solve(path) {
  const parts = path.split('/');
  const stack = [];
  for (const p of parts) {
    if (p === '' || p === '.') {
      continue;
    } else if (p === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(p);
    }
  }
  return '/' + stack.join('/');
}