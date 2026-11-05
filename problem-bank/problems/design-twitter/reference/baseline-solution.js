export function solve(operations, values) {
  let clock = 0;
  const userTweets = new Map(); // userId -> [{ clock, tweetId }]
  const following = new Map(); // followerId -> Set(followeeId)
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const val = values[i];

    if (op === "postTweet") {
      const [u, tid] = val;
      if (!userTweets.has(u)) userTweets.set(u, []);
      userTweets.get(u).push({ clock: clock++, tweetId: tid });
      result.push("null");
    } else if (op === "getNewsFeed") {
      const u = val[0];
      const validUsers = new Set([u]);
      if (following.has(u)) {
        for (const f of following.get(u)) validUsers.add(f);
      }
      const candidates = [];
      for (const user of validUsers) {
        const twList = userTweets.get(user) || [];
        for (const tw of twList) candidates.push(tw);
      }
      candidates.sort((a, b) => b.clock - a.clock);
      const top10 = candidates.slice(0, 10).map(c => c.tweetId);
      result.push(top10.length > 0 ? top10.join(",") : "empty");
    } else if (op === "follow") {
      const [f1, f2] = val;
      if (!following.has(f1)) following.set(f1, new Set());
      following.get(f1).add(f2);
      result.push("null");
    } else if (op === "unfollow") {
      const [f1, f2] = val;
      if (following.has(f1)) following.get(f1).delete(f2);
      result.push("null");
    }
  }

  return result;
}
