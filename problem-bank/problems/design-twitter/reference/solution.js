export function solve(operations, values) {
  let time = 0;
  const tweets = []; // { time, userId, tweetId }
  const follows = new Map(); // userId -> Set of followeeId

  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const val = values[i];

    if (op === "postTweet") {
      const [userId, tweetId] = val;
      tweets.push({ time: time++, userId, tweetId });
      result.push("null");
    } else if (op === "getNewsFeed") {
      const userId = val[0];
      const followees = follows.get(userId) || new Set();
      const feed = [];
      for (let t = tweets.length - 1; t >= 0 && feed.length < 10; t--) {
        const tw = tweets[t];
        if (tw.userId === userId || followees.has(tw.userId)) {
          feed.push(tw.tweetId);
        }
      }
      result.push(feed.length > 0 ? feed.join(",") : "empty");
    } else if (op === "follow") {
      const [followerId, followeeId] = val;
      if (!follows.has(followerId)) follows.set(followerId, new Set());
      follows.get(followerId).add(followeeId);
      result.push("null");
    } else if (op === "unfollow") {
      const [followerId, followeeId] = val;
      if (follows.has(followerId)) follows.get(followerId).delete(followeeId);
      result.push("null");
    }
  }

  return result;
}
