# Course Schedule II

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.

Return the ordering of courses you should take to finish all courses. If there are multiple valid answers, courses with smaller course IDs should be chosen first.

All test cases are guaranteed to be valid DAGs where a topological ordering exists.

### Examples

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1, 0]]
Output: 0 1
```

**Example 2:**
```
Input: numCourses = 4, prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]
Output: 0 1 2 3
```

### Constraints

- `1 <= numCourses <= 100`
- `0 <= prerequisites.length <= 100`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `ai != bi`
- All the pairs `[ai, bi]` are distinct.
