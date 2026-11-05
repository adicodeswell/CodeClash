export function solve(arr) {
  const MOD = 1000000007n;
  const n = arr.length;
  const ple = new Array(n); // previous less element distance
  const nle = new Array(n); // next less or equal distance

  let stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    ple[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    nle[i] = stack.length === 0 ? n - i : stack[stack.length - 1] - i;
    stack.push(i);
  }

  let total = 0n;
  for (let i = 0; i < n; i++) {
    const count = BigInt(ple[i]) * BigInt(nle[i]);
    total = (total + count * BigInt(arr[i])) % MOD;
  }

  return Number(total);
}