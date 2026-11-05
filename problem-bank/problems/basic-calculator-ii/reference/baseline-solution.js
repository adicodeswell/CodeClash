export function solve(s) {
  const tokens = [];
  let cur = "";
  for (const c of s) {
    if (c === ' ') continue;
    if ('+-*/'.includes(c)) {
      tokens.push(Number(cur));
      tokens.push(c);
      cur = "";
    } else {
      cur += c;
    }
  }
  tokens.push(Number(cur));

  // Pass 1: * and /
  const pass1 = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === '*' || t === '/') {
      const prev = pass1.pop();
      const next = tokens[i + 1];
      pass1.push(t === '*' ? prev * next : Math.trunc(prev / next));
      i += 2;
    } else {
      pass1.push(t);
      i++;
    }
  }

  // Pass 2: + and -
  let ans = pass1[0];
  let j = 1;
  while (j < pass1.length) {
    const op = pass1[j];
    const next = pass1[j + 1];
    ans = op === '+' ? ans + next : ans - next;
    j += 2;
  }
  return ans;
}