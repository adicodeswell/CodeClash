export function solve(digits) {
  if (!digits) return [];
  const map = {
    "2": ["a", "b", "c"], "3": ["d", "e", "f"], "4": ["g", "h", "i"],
    "5": ["j", "k", "l"], "6": ["m", "n", "o"], "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"], "9": ["w", "x", "y", "z"]
  };

  let acc = [""];
  for (const d of digits) {
    const next = [];
    const letters = map[d];
    for (const prefix of acc) {
      for (const ch of letters) {
        next.push(prefix + ch);
      }
    }
    acc = next;
  }
  acc.sort();
  return acc;
}
