# Maximum Points You Can Obtain from Cards

There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array `cardPoints`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array `cardPoints` and the integer `k`, return the maximum score you can obtain.

### Examples

**Example 1:**
```
Input: cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3
Output: 12
Explanation: Taking the three cards on the right gives 1 + 6 + 5 = 12.
```

**Example 2:**
```
Input: cardPoints = [2, 2, 2], k = 2
Output: 4
```

**Example 3:**
```
Input: cardPoints = [9, 7, 7, 9, 7, 7, 9], k = 7
Output: 55
```

### Constraints

- `1 <= cardPoints.length <= 10^5`
- `1 <= cardPoints[i] <= 10^4`
- `1 <= k <= cardPoints.length`
