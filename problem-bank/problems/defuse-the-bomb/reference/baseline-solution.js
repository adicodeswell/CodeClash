export function solve(code, k) {
  const n = code.length;
  const res = new Array(n).fill(0);
  if (k === 0) return res;

  for (let i = 0; i < n; i++) {
    let s = 0;
    if (k > 0) {
      for (let j = 1; j <= k; j++) s += code[(i + j) % n];
    } else {
      for (let j = 1; j <= -k; j++) s += code[(i - j + n) % n];
    }
    res[i] = s;
  }
  return res;
}
