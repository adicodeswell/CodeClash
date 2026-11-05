# Task Scheduler

Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer `n` that represents the cooldown period between two **same tasks** (the same letter in the CPU). That is, there must be at least `n` units of time between any two identical tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

### Examples

**Example 1:**
```
Input: tasks = ["A", "A", "A", "B", "B", "B"], n = 2
Output: 8
```

**Example 2:**
```
Input: tasks = ["A", "C", "A", "B", "D", "B"], n = 1
Output: 6
```

### Constraints

- `1 <= tasks.length <= 10^4`
- `tasks[i]` is an uppercase English letter.
- `0 <= n <= 100`
