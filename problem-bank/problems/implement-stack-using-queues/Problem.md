# Implement Stack using Queues

Implement a last-in-first-out (LIFO) stack using only queues. The implemented stack should support all functions of a normal stack (`push`, `top`, `pop`, and `empty`).

Implement the operations:
- `push(x)`: Pushes element x to the top of the stack. Output: `null`.
- `pop()`: Removes the element on the top of the stack and returns it. Output: string representation of the integer value.
- `top()`: Gets the top element of the stack. Output: string representation of the integer value.
- `empty()`: Returns `true` if the stack is empty, `false` otherwise. Output: `"true"` or `"false"`.

### Examples

**Example 1:**
```
Input:
operations = ["push", "push", "top", "pop", "empty"]
values = [[1], [2], [], [], []]
Output: null null 2 2 false
Explanation:
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
```

### Constraints

- `1 <= operations.length <= 100`
- `1 <= x <= 9`
- At most 100 calls will be made to `push`, `pop`, `top`, and `empty`.
- All the calls to `pop` and `top` are valid.
