export function solve(n) {
  const result = [];
  function generate(cur) {
    if (cur.length === 2 * n) {
      let bal = 0;
      for (let i = 0; i < cur.length; i++) {
        if (cur[i] === "(") bal++;
        else bal--;
        if (bal < 0) return;
      }
      if (bal === 0) result.push(cur);
      return;
    }
    generate(cur + "(");
    generate(cur + ")");
  }
  generate("");
  result.sort();
  return result;
}
