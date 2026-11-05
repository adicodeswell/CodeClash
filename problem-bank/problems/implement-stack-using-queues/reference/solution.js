export function solve(operations, values) {
  let q1 = [];
  let q2 = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      q2.push(values[i][0]);
      while (q1.length > 0) {
        q2.push(q1.shift());
      }
      const temp = q1;
      q1 = q2;
      q2 = temp;
      result.push("null");
    } else if (op === "pop") {
      result.push(String(q1.shift()));
    } else if (op === "top") {
      result.push(String(q1[0]));
    } else if (op === "empty") {
      result.push(q1.length === 0 ? "true" : "false");
    }
  }
  return result;
}