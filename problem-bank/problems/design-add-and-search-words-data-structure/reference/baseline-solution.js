export function solve(operations, words) {
  const dict = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const word = words[i];

    if (op === "addWord") {
      dict.push(word);
      result.push("null");
    } else if (op === "search") {
      let match = false;
      for (const added of dict) {
        if (added.length !== word.length) continue;
        let ok = true;
        for (let j = 0; j < word.length; j++) {
          if (word[j] !== "." && word[j] !== added[j]) {
            ok = false;
            break;
          }
        }
        if (ok) {
          match = true;
          break;
        }
      }
      result.push(match ? "true" : "false");
    }
  }

  return result;
}
