export function solve(operations, values) {
  const q = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "pushFront") {
      q.unshift(values[i][0]);
      result.push("null");
    } else if (op === "pushMiddle") {
      const mid = Math.floor(q.length / 2);
      q.splice(mid, 0, values[i][0]);
      result.push("null");
    } else if (op === "pushBack") {
      q.push(values[i][0]);
      result.push("null");
    } else if (op === "popFront") {
      if (q.length === 0) {
        result.push("-1");
      } else {
        result.push(String(q.shift()));
      }
    } else if (op === "popMiddle") {
      if (q.length === 0) {
        result.push("-1");
      } else {
        const mid = Math.floor((q.length - 1) / 2);
        const val = q.splice(mid, 1)[0];
        result.push(String(val));
      }
    } else if (op === "popBack") {
      if (q.length === 0) {
        result.push("-1");
      } else {
        result.push(String(q.pop()));
      }
    }
  }

  return result;
}