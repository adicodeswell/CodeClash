# Stock Span Problem

The stock span problem is a financial problem where we have a series of `n` daily price quotes for a stock and we need to calculate the span of stock’s price for all `n` days.

The span `S_i` of the stock’s price on a given day `i` is defined as the maximum number of consecutive days just before the given day, for which the price of the stock on the current day is less than or equal to its price on the given day.

### Examples

**Example 1:**
```
Input: price = [100, 80, 60, 70, 60, 75, 85]
Output: 1 1 1 2 1 4 6
```

**Example 2:**
```
Input: price = [10, 4, 5, 90, 120, 80]
Output: 1 1 2 4 5 1
```

### Constraints

- `1 <= price.length <= 10^5`
- `1 <= price[i] <= 10^5`
