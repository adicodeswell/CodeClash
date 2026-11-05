# Implement Queue using Stacks

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the operations:
- `push(x)`: Pushes element x to the back of the queue. Output: `null`.
- `pop()`: Removes the element from the front of the queue and returns it. Output: string representation of the integer value.
- `peek()`: Returns the element at the front of the queue. Output: string representation of the integer value.
- `empty()`: Returns `true` if the queue is empty, `false` otherwise. Output: `"true"` or `"false"`.

### Examples

**Example 1:**
```
Input:
operations = ["push", "push", "peek", "pop", "empty"]
values = [[1], [2], [], [], []]
Output: null null 1 1 false
Explanation:
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2]
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

### Constraints

- `1 <= operations.length <= 100`
- `1 <= x <= 9`
- At most 100 calls will be made to `push`, `pop`, `peek`, and `empty`.
- All the calls to `pop` and `peek` are valid.
