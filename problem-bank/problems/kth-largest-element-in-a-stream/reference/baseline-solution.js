export function solve(k, nums, valList) {
  const stream = [...nums];
  const result = [];
  for (const v of valList) {
    stream.push(v);
    stream.sort((a, b) => b - a);
    result.push(stream[k - 1]);
  }
  return result;
}
