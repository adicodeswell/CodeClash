export function solve(inputs) {
  const result = [];
  for (let i = 0; i < inputs.length; i++) {
    const t = inputs[i];
    let count = 0;
    for (let j = 0; j <= i; j++) {
      if (inputs[j] >= t - 3000) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
}