export function solve(n) {
  const res = [];
  const queens = []; // column index for each row

  function isValid(r, c) {
    for (let prevR = 0; prevR < r; prevR++) {
      const prevC = queens[prevR];
      if (prevC === c || Math.abs(prevC - c) === Math.abs(prevR - r)) return false;
    }
    return true;
  }

  function dfs(r) {
    if (r === n) {
      const solution = [];
      for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j < n; j++) {
          row += queens[i] === j ? "Q" : ".";
        }
        solution.push(row);
      }
      res.push(solution);
      return;
    }
    for (let c = 0; c < n; c++) {
      if (isValid(r, c)) {
        queens.push(c);
        dfs(r + 1);
        queens.pop();
      }
    }
  }

  dfs(0);

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
    }
    return 0;
  });

  return res;
}
