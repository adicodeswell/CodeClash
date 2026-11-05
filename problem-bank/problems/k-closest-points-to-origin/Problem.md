# K Closest Points to Origin

Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.

The distance between two points on the X-Y plane is the Euclidean distance:
`sqrt((x1 - x2)^2 + (y1 - y2)^2)`.

You must return the list of `k` closest points sorted primarily by squared Euclidean distance ascending, then by `x` ascending, and finally by `y` ascending to guarantee a unique, deterministic result.

### Examples

**Example 1:**
```
Input:
points = [[1, 3], [-2, 2]]
k = 1
Output:
-2 2
```

**Example 2:**
```
Input:
points = [[3, 3], [5, -1], [-2, 4]]
k = 2
Output:
3 3
-2 4
```

### Constraints

- `1 <= k <= points.length <= 100`
- `-1000 <= xi, yi <= 1000`
