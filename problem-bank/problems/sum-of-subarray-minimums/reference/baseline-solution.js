export function solve(arr) {
  const MOD = 1000000007;
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    let curMin = arr[i];
    for (let j = i; j < arr.length; j++) {
      curMin = Math.min(curMin, arr[j]);
      total = (total + curMin) % MOD;
    }
  }
  return total;
}