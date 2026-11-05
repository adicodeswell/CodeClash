export function solve(s) {
  if (!s || s[0] === "0") return 0;
  const n = s.length;
  let prev2 = 1, prev1 = 1;

  for (let i = 1; i < n; i++) {
    let cur = 0;
    if (s[i] !== "0") cur += prev1;
    const twoDigit = Number(s.substring(i - 1, i + 1));
    if (twoDigit >= 10 && twoDigit <= 26) cur += prev2;

    prev2 = prev1;
    prev1 = cur;
  }

  return prev1;
}
