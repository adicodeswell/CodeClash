# Design Front Middle Back Queue

Design a queue that supports push and pop operations in the front, middle, and back.

Implement the operations:
- `pushFront(val)`: Adds `val` to the front of the queue. Output: `null`.
- `pushMiddle(val)`: Adds `val` to the middle of the queue. If there are `n` elements, it is placed at index `floor(n / 2)`. Output: `null`.
- `pushBack(val)`: Adds `val` to the back of the queue. Output: `null`.
- `popFront()`: Removes and returns the front element, or `-1` if empty. Output: string representation.
- `popMiddle()`: Removes and returns the middle element. If there are `n` elements, removes the element at index `floor((n - 1) / 2)`. Returns `-1` if empty. Output: string representation.
- `popBack()`: Removes and returns the back element, or `-1` if empty. Output: string representation.

### Examples

**Example 1:**
```
Input:
operations = ["pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
values = [[1], [2], [3], [4], [], [], [], [], []]
Output: null null null null 1 3 4 2 -1
Explanation:
FrontMiddleBackQueue q = new FrontMiddleBackQueue();
q.pushFront(1);   // [1]
q.pushBack(2);    // [1, 2]
q.pushMiddle(3);  // [1, 3, 2]
q.pushMiddle(4);  // [1, 4, 3, 2]
q.popFront();     // return 1 -> [4, 3, 2]
q.popMiddle();    // return 3 -> [4, 2]
q.popMiddle();    // return 4 -> [2]
q.popBack();      // return 2 -> []
q.popFront();     // return -1 -> [] (empty)
```

### Constraints

- `1 <= operations.length <= 1000`
- `1 <= val <= 1000`
- At most 1000 calls will be made to the functions.
