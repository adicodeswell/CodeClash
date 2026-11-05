export function solve(operations, values) {
  const list = [];
  const out = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "pushFront") {
      list.unshift(values[i][0]);
      out.push("null");
    } else if (op === "pushMiddle") {
      const m = Math.floor(list.length / 2);
      list.splice(m, 0, values[i][0]);
      out.push("null");
    } else if (op === "pushBack") {
      list.push(values[i][0]);
      out.push("null");
    } else if (op === "popFront") {
      out.push(list.length === 0 ? "-1" : String(list.shift()));
    } else if (op === "popMiddle") {
      if (list.length === 0) {
        out.push("-1");
      } else {
        const m = Math.floor((list.length - 1) / 2);
        out.push(String(list.splice(m, 1)[0]));
      }
    } else if (op === "popBack") {
      out.push(list.length === 0 ? "-1" : String(list.pop()));
    }
  }
  return out;
}