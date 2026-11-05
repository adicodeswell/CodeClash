export function solve(code, k) {
  const n = code.length;
  const res = new Array(n).fill(0);
  if (k === 0) return res;

  let start = k > 0 ? 1 : n + k;
  let end = k > 0 ? k : n - 1;
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += code[i % n];
  }

  for (let i = 0; i < n; i++) {
    res[i] = sum;
    sum -= code[start % n];
    start++;
    end++;
    sum += code[end % n];
  }

  return res;
}
