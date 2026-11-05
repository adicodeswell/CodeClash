export function solve(operations, words) {
  const inserted = new Set();
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const word = words[i];

    if (op === "insert") {
      inserted.add(word);
      result.push("null");
    } else if (op === "search") {
      result.push(inserted.has(word) ? "true" : "false");
    } else if (op === "startsWith") {
      let match = false;
      for (const w of inserted) {
        if (w.startsWith(word)) {
          match = true;
          break;
        }
      }
      result.push(match ? "true" : "false");
    }
  }

  return result;
}
