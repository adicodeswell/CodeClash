export function solve(startTime, endTime, profit) {
  const n = startTime.length;
  const jobs = [];
  for (let i = 0; i < n; i++) {
    jobs.push({ s: startTime[i], e: endTime[i], p: profit[i] });
  }

  jobs.sort((a, b) => a.s - b.s);

  const memo = new Map();

  function dfs(idx) {
    if (idx >= n) return 0;
    if (memo.has(idx)) return memo.get(idx);

    // Option 1: Skip job idx
    let ans = dfs(idx + 1);

    // Option 2: Take job idx, binary search next compatible job
    let nextIdx = n;
    let l = idx + 1, r = n - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (jobs[mid].s >= jobs[idx].e) {
        nextIdx = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    ans = Math.max(ans, jobs[idx].p + dfs(nextIdx));
    memo.set(idx, ans);
    return ans;
  }

  return dfs(0);
}
