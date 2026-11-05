# Simplify Path

Given an absolute path for a Unix-style file system, convert it to the simplified canonical path.

In Unix-style file system:
- A period `'.'` refers to the current directory.
- A double period `'..'` refers to the directory up a level.
- Any multiple consecutive slashes, such as `'//'`, are treated as a single slash `'/'`.

The canonical path should have the following format:
- The path starts with a single slash `'/'`.
- Any two directories are separated by a single slash `'/'`.
- The path does not end with a trailing `'/'`.
- The path only contains the directories on the path from the root directory to the target file or directory.

### Examples

**Example 1:**
```
Input: path = "/home/"
Output: /home
```

**Example 2:**
```
Input: path = "/../"
Output: /
```

**Example 3:**
```
Input: path = "/home//foo/"
Output: /home/foo
```

### Constraints

- `1 <= path.length <= 3000`
- `path` consists of English letters, digits, period `'.'`, slash `'/'` or `'_'`.
- `path` is a valid absolute Unix path.
