# Detect Squares

You are given a stream of points on the X-Y plane. You need to implement a data structure that supports two operations:
- `add([x, y])`: Adds a new point `[x, y]` to the data structure. Duplicate points are allowed and should be treated as different points.
- `count([x, y])`: Counts the number of ways to choose three points from the data structure such that the three points and the query point form an **axis-aligned square** with **positive area**.

An axis-aligned square has edges that are parallel to the x-axis and y-axis.

Return a list of responses: `"null"` for each `add` operation, and the count as a string for each `count` operation.

### Examples

**Example 1:**
```
Input:
operations = ["add", "add", "add", "count", "count", "add", "count"]
points = [[3, 10], [11, 2], [3, 2], [11, 10], [14, 8], [11, 2], [11, 10]]
Output:
null null null 1 0 null 2
Explanation:
- add([3, 10]): returns null
- add([11, 2]): returns null
- add([3, 2]): returns null
- count([11, 10]): 1 way formed by (3, 10), (11, 2), (3, 2), and (11, 10).
- count([14, 8]): 0 ways.
- add([11, 2]): duplicate point added.
- count([11, 10]): 2 ways formed since (11, 2) has multiplicity 2.
```

### Constraints

- `1 <= operations.length == points.length <= 1000`
- `points[i].length == 2`
- `0 <= x, y <= 1000`
- At most `1000` calls in total will be made to `add` and `count`.
