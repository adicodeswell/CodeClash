# Design Twitter

Design a simplified version of a social feed service where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in their news feed.

Implement the feed operations given by `operations` and `values`:
- `"postTweet"`: `values[i] = [userId, tweetId]`. Composes a new tweet with ID `tweetId` by user `userId`. Returns `"null"`.
- `"getNewsFeed"`: `values[i] = [userId]`. Retrieves the 10 most recent tweet IDs in the user's news feed, posted by the user themselves or someone they follow. Tweets must be ordered from most recent to least recent, formatted as a comma-separated string (e.g. `"5,6"`). If the news feed is empty, returns `"empty"`.
- `"follow"`: `values[i] = [followerId, followeeId]`. The user with ID `followerId` starts following the user with ID `followeeId`. Returns `"null"`.
- `"unfollow"`: `values[i] = [followerId, followeeId]`. The user with ID `followerId` unfollows the user with ID `followeeId`. Returns `"null"`.

### Examples

**Example 1:**
```
Input:
operations = ["postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
values = [[1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output: null 5 null null 6,5 null 5
```

### Constraints

- `1 <= operations.length <= 100`
- `1 <= userId, followerId, followeeId <= 500`
- `0 <= tweetId <= 10^4`
- All the tweets have unique IDs.
- A user cannot follow themselves.
