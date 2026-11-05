export function solve(s) {
  const counts = new Map();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    counts.set(ch, (counts.get(ch) || 0) + 1);
  }

  let len = 0;
  let hasOdd = false;

  for (const count of counts.values()) {
    if (count % 2 === 0) {
      len += count;
    } else {
      len += count - 1;
      hasOdd = true;
    }
  }

  return hasOdd ? len + 1 : len;
}
