export function solve(s) {
  const res = [];

  function check(str) {
    return str === str.split("").reverse().join("");
  }

  function backtrack(idx, part) {
    if (idx === s.length) {
      res.push([...part]);
      return;
    }
    for (let i = idx + 1; i <= s.length; i++) {
      const sub = s.substring(idx, i);
      if (check(sub)) {
        part.push(sub);
        backtrack(i, part);
        part.pop();
      }
    }
  }

  backtrack(0, []);

  res.sort((a, b) => {
    const sa = a.join(",");
    const sb = b.join(",");
    return sa.localeCompare(sb);
  });

  return res;
}
