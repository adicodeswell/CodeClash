export function solve(s) {
  const res = [];
  const curr = [];

  function isPal(str, l, r) {
    while (l < r) {
      if (str[l] !== str[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  function dfs(start) {
    if (start === s.length) {
      res.push([...curr]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(s, start, end)) {
        curr.push(s.slice(start, end + 1));
        dfs(end + 1);
        curr.pop();
      }
    }
  }

  dfs(0);

  res.sort((a, b) => {
    const sa = a.join(",");
    const sb = b.join(",");
    return sa.localeCompare(sb);
  });

  return res;
}
