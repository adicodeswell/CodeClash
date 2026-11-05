export function solve(path) {
  const tokens = path.split('/').filter(x => x !== '' && x !== '.');
  const res = [];
  for (const t of tokens) {
    if (t === '..') {
      if (res.length > 0) res.pop();
    } else {
      res.push(t);
    }
  }
  return '/' + res.join('/');
}