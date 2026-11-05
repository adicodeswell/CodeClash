# Find Median from Data Stream

The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

- For example, for `arr = [2, 3, 4]`, the median is `3.0`.
- For example, for `arr = [2, 3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the data structure supporting the following operations given by `operations` and `values`:
- `"addNum"`: `values[i] = [num]`. Adds the integer `num` from the data stream to the data structure. Returns `"null"`.
- `"findMedian"`: `values[i] = []`. Returns the median of all elements so far, formatted as a string rounded to one decimal place (e.g. `"1.5"` or `"2.0"`).

### Examples

**Example 1:**
```
Input:
operations = ["addNum", "addNum", "findMedian", "addNum", "findMedian"]
values = [[1], [2], [], [3], []]
Output: null null 1.5 null 2.0
```

### Constraints

- `1 <= operations.length <= 100`
- `-10^5 <= num <= 10^5`
- There will be at least one element in the data structure before calling `findMedian`.
