export function solve(l1, l2) {
  const result = [];
  let carry = 0;
  let i = 0, j = 0;
  while (i < l1.length || j < l2.length || carry > 0) {
    const val1 = i < l1.length ? l1[i++] : 0;
    const val2 = j < l2.length ? l2[j++] : 0;
    const sum = val1 + val2 + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  return result;
}
