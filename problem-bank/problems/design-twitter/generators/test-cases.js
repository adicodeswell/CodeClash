import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"],
      values: [[1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
    }
  });

  cases.push({
    category: "basic",
    description: "Empty news feed",
    inputs: {
      operations: ["getNewsFeed"],
      values: [[1]]
    }
  });

  cases.push({
    category: "basic",
    description: "Multiple tweets by same user",
    inputs: {
      operations: ["postTweet", "postTweet", "postTweet", "getNewsFeed"],
      values: [[1, 101], [1, 102], [1, 103], [1]]
    }
  });

  for (let i = 3; i < 10; i++) {
    const ops = ["postTweet", "follow", "postTweet", "getNewsFeed"];
    const vals = [[1, 200 + i], [2, 1], [2, 300 + i], [2]];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { operations: ops, values: vals } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const ops = ["postTweet", "getNewsFeed", "getNewsFeed"];
    const vals = [[i, 1000 + i], [i], [i + 1]];
    cases.push({ category: "edge", description: "Unfollowed user feed " + i, inputs: { operations: ops, values: vals } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = [];
    const vals = [];
    for (let k = 0; k < 12; k++) {
      ops.push("postTweet");
      vals.push([1, 5000 + k]);
    }
    ops.push("getNewsFeed");
    vals.push([1]);
    cases.push({ category: "corner", description: "More than 10 tweets " + i, inputs: { operations: ops, values: vals } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const vals = [];
    let twId = 8000 + i * 50;
    for (let k = 0; k < 20; k++) {
      const type = pickRandom(rng, ["postTweet", "getNewsFeed", "follow", "unfollow"]);
      ops.push(type);
      if (type === "postTweet") {
        vals.push([randomInt(rng, 1, 4), twId++]);
      } else if (type === "getNewsFeed") {
        vals.push([randomInt(rng, 1, 4)]);
      } else {
        const u1 = randomInt(rng, 1, 3);
        const u2 = u1 === 1 ? 2 : 1;
        vals.push([u1, u2]);
      }
    }
    cases.push({ category: "random", description: "Random actions " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const vals = [];
    let twId = 15000 + i * 100;
    for (let k = 0; k < 35; k++) {
      const type = pickRandom(rng, ["postTweet", "getNewsFeed", "follow", "unfollow"]);
      ops.push(type);
      if (type === "postTweet") {
        vals.push([randomInt(rng, 1, 6), twId++]);
      } else if (type === "getNewsFeed") {
        vals.push([randomInt(rng, 1, 6)]);
      } else {
        const u1 = randomInt(rng, 1, 5);
        const u2 = randomInt(rng, 1, 5);
        vals.push([u1, u1 === u2 ? (u1 % 5) + 1 : u2]);
      }
    }
    cases.push({ category: "large", description: "Large actions " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}
