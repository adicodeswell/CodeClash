export function solve(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;
  const memo = new Map();

  function dfs(i, j) {
    if (i === s1.length && j === s2.length) return true;
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    let res = false;
    const k = i + j;
    if (i < s1.length && s1[i] === s3[k] && dfs(i + 1, j)) res = true;
    if (!res && j < s2.length && s2[j] === s3[k] && dfs(i, j + 1)) res = true;

    memo.set(key, res);
    return res;
  }

  return dfs(0, 0);
}
