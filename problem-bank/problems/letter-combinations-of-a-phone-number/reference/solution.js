export function solve(digits) {
  if (!digits || digits.length === 0) return [];
  const map = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
  };

  const res = [];

  function dfs(idx, curr) {
    if (idx === digits.length) {
      res.push(curr);
      return;
    }
    const letters = map[digits[idx]];
    for (const ch of letters) {
      dfs(idx + 1, curr + ch);
    }
  }

  dfs(0, "");
  res.sort();
  return res;
}
