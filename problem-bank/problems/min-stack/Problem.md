# Min Stack

Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.

Implement the `MinStack` class operations sequence:
- `push(val)`: Pushes the element `val` onto the stack. Output: `null`.
- `pop()`: Removes the element on the top of the stack. Output: `null`.
- `top()`: Gets the top element of the stack. Output: string representation of the integer value.
- `getMin()`: Retrieves the minimum element in the stack. Output: string representation of the integer value.

### Examples

**Example 1:**
```
Input:
operations = ["push", "push", "push", "getMin", "pop", "top", "getMin"]
values = [[-2], [0], [-3], [], [], [], []]
Output: null null null -3 null 0 -2
Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

### Constraints

- `1 <= operations.length <= 3 * 10^4`
- `-2^31 <= val <= 2^31 - 1`
- Methods `pop`, `top` and `getMin` operations will always be called on non-empty stacks.
