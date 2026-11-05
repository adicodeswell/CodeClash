# Diet Plan Performance

A dieter consumes `calories[i]` calories on the `i`-th day.

Given an integer `k`, for **every** consecutive sequence of `k` days (`calories[i], calories[i+1], ..., calories[i+k-1]` for all `0 <= i <= n-k`), they look at `T`, the total calories consumed during that sequence of `k` days:
- If `T < lower`, they performed poorly on their diet and lose 1 point;
- If `T > upper`, they performed well on their diet and gain 1 point;
- Otherwise, they performed normally and their points do not change.

Initially, the dieter has zero points. Return the total number of points the dieter has after dieting for `calories.length` days.

Note that the total points can be negative.

### Examples

**Example 1:**
```
Input: calories = [1, 2, 3, 4, 5], k = 1, lower = 3, upper = 3
Output: 0
Explanation:
- Day 0: 1 < 3 -> -1 point
- Day 1: 2 < 3 -> -1 point
- Day 2: 3 == 3 -> 0 points
- Day 3: 4 > 3 -> +1 point
- Day 4: 5 > 3 -> +1 point
Total points: 0.
```

**Example 2:**
```
Input: calories = [3, 2], k = 2, lower = 0, upper = 1
Output: 1
Explanation: Total calories in the 2-day period is 5 > 1, so +1 point.
```

**Example 3:**
```
Input: calories = [6, 5, 0, 0], k = 2, lower = 1, upper = 5
Output: 0
```

### Constraints

- `1 <= k <= calories.length <= 10^5`
- `0 <= calories[i] <= 20000`
- `0 <= lower <= upper`
