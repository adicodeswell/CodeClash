export function solve(num, k) {
  if (k >= num.length) return "0";
  const st = [];
  let rem = k;
  for (const c of num) {
    while (rem > 0 && st.length > 0 && st[st.length - 1] > c) {
      st.pop();
      rem--;
    }
    st.push(c);
  }
  while (rem > 0) {
    st.pop();
    rem--;
  }
  let str = st.join('').replace(/^0+/, '');
  return str === '' ? "0" : str;
}