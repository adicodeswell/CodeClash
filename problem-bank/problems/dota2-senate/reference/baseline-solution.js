export function solve(senate) {
  const arr = senate.split('');
  let rCount = arr.filter(c => c === 'R').length;
  let dCount = arr.length - rCount;
  let rBan = 0;
  let dBan = 0;

  let i = 0;
  while (rCount > 0 && dCount > 0) {
    if (arr[i] === 'R') {
      if (rBan > 0) {
        rBan--;
        arr[i] = 'X';
        rCount--;
      } else {
        dBan++;
      }
    } else if (arr[i] === 'D') {
      if (dBan > 0) {
        dBan--;
        arr[i] = 'X';
        dCount--;
      } else {
        rBan++;
      }
    }
    i = (i + 1) % arr.length;
  }
  return rCount > 0 ? "Radiant" : "Dire";
}