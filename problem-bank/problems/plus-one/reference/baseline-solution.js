export function solve(digits) {
  let carry = 1;
  const res = [];
  for (let i = digits.length - 1; i >= 0; i--) {
    const sum = digits[i] + carry;
    res.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  if (carry > 0) res.push(carry);
  return res.reverse();
}
