# Number of Recent Calls

You have a `RecentCounter` class which counts the number of recent requests within a certain time frame.

Implement the `RecentCounter` operations:
- `ping(t)`: Adds a new request at time `t`, where `t` represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range `[t - 3000, t]`.

It is guaranteed that every call to `ping` uses a strictly larger value of `t` than the previous call.

### Examples

**Example 1:**
```
Input: inputs = [1, 100, 3001, 3002]
Output: 1 2 3 3
Explanation:
- ping(1) -> returns 1
- ping(100) -> returns 2
- ping(3001) -> returns 3 (requests in [1, 3001] are 1, 100, 3001)
- ping(3002) -> returns 3 (requests in [2, 3002] are 100, 3001, 3002)
```

### Constraints

- `1 <= inputs.length <= 10^4`
- `1 <= t <= 10^9`
- Each test case will call `ping` with strictly increasing values of `t`.
