export function solve(a, b, c) {
  let ans = 0;
  while (a > 0 || b > 0 || c > 0) {
    const ba = a & 1;
    const bb = b & 1;
    const bc = c & 1;
    if (bc === 0) {
      ans += ba + bb;
    } else {
      if (ba === 0 && bb === 0) ans++;
    }
    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return ans;
}