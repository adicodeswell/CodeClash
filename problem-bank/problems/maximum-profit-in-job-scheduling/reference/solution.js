export function solve(startTime, endTime, profit) {
  const n = startTime.length;
  const jobs = [];
  for (let i = 0; i < n; i++) {
    jobs.push({ s: startTime[i], e: endTime[i], p: profit[i] });
  }

  jobs.sort((a, b) => a.e - b.e);

  // dp[i] = { e: endTime, p: maxProfit }
  const dp = [{ e: 0, p: 0 }];

  for (const job of jobs) {
    // Binary search for last job with endTime <= job.s
    let low = 0, high = dp.length - 1, bestIdx = 0;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (dp[mid].e <= job.s) {
        bestIdx = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const curProfit = dp[bestIdx].p + job.p;
    if (curProfit > dp[dp.length - 1].p) {
      dp.push({ e: job.e, p: curProfit });
    }
  }

  return dp[dp.length - 1].p;
}
