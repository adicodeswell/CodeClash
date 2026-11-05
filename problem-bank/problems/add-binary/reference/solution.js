export function solve(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const res = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    const bitA = i >= 0 ? a.charCodeAt(i--) - 48 : 0;
    const bitB = j >= 0 ? b.charCodeAt(j--) - 48 : 0;
    const sum = bitA + bitB + carry;
    res.push(sum % 2);
    carry = Math.floor(sum / 2);
  }

  return res.reverse().join("");
}
