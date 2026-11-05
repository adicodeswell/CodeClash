export function solve(s, p) {
  const memo = new Map();

  function match(i, j) {
    if (j === p.length) return i === s.length;
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    const firstMatch = i < s.length && (p[j] === s[i] || p[j] === ".");

    let ans;
    if (j + 1 < p.length && p[j + 1] === "*") {
      ans = match(i, j + 2) || (firstMatch && match(i + 1, j));
    } else {
      ans = firstMatch && match(i + 1, j + 1);
    }

    memo.set(key, ans);
    return ans;
  }

  return match(0, 0);
}
