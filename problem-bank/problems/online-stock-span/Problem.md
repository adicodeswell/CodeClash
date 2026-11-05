# Online Stock Span

Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

Return the array of spans for all consecutive days in `prices`.

### Examples

**Example 1:**
```
Input: prices = [100, 80, 60, 70, 60, 75, 85]
Output: 1 1 1 2 1 4 6
Explanation:
- 100: span 1
- 80: span 1
- 60: span 1
- 70: span 2 (70, 60)
- 60: span 1
- 75: span 4 (75, 60, 70, 60)
- 85: span 6 (85, 75, 60, 70, 60, 80)
```

### Constraints

- `1 <= prices.length <= 10^4`
- `1 <= prices[i] <= 10^5`
