export function solve(capacity, operations, values) {
  const store = [];
  const result = [];
  let timer = 0;
  for (let i = 0; i < operations.length; i++) {
    timer++;
    const op = operations[i];
    if (op === "put") {
      const key = values[i][0];
      const val = values[i][1];
      const idx = store.findIndex((item) => item.key === key);
      if (idx !== -1) {
        store[idx].val = val;
        store[idx].time = timer;
      } else {
        if (store.length >= capacity) {
          let oldestIdx = 0;
          for (let j = 1; j < store.length; j++) {
            if (store[j].time < store[oldestIdx].time) oldestIdx = j;
          }
          store.splice(oldestIdx, 1);
        }
        store.push({ key, val, time: timer });
      }
      result.push("null");
    } else if (op === "get") {
      const key = values[i][0];
      const item = store.find((x) => x.key === key);
      if (!item) {
        result.push("-1");
      } else {
        item.time = timer;
        result.push(String(item.val));
      }
    }
  }
  return result;
}
