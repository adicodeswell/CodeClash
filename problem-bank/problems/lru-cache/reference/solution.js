export function solve(capacity, operations, values) {
  const cache = new Map();
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "put") {
      const key = values[i][0];
      const val = values[i][1];
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= capacity) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      cache.set(key, val);
      result.push("null");
    } else if (op === "get") {
      const key = values[i][0];
      if (!cache.has(key)) {
        result.push("-1");
      } else {
        const val = cache.get(key);
        cache.delete(key);
        cache.set(key, val);
        result.push(String(val));
      }
    }
  }
  return result;
}
