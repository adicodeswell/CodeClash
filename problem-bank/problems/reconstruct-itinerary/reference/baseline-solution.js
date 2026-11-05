export function solve(tickets) {
  const sorted = [...tickets].sort((a, b) => {
    if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
    return a[1].localeCompare(b[1]);
  });
  const used = Array(sorted.length).fill(false);
  let res = null;

  function dfs(curr, count, path) {
    if (res) return;
    if (count === sorted.length) {
      res = [...path];
      return;
    }
    for (let i = 0; i < sorted.length; i++) {
      if (!used[i] && sorted[i][0] === curr) {
        used[i] = true;
        path.push(sorted[i][1]);
        dfs(sorted[i][1], count + 1, path);
        path.pop();
        used[i] = false;
      }
    }
  }

  dfs("JFK", 0, ["JFK"]);
  return res || [];
}
