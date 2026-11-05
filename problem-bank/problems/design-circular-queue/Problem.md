# Design Circular Queue

Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle.

Implement the operations:
- `enQueue(value)`: Inserts an element into the circular queue. Return `"true"` if successful, `"false"` if full.
- `deQueue()`: Deletes an element from the circular queue. Return `"true"` if successful, `"false"` if empty.
- `Front()`: Gets the front item from the queue. If the queue is empty, return `"-1"`. Otherwise string of value.
- `Rear()`: Gets the last item from the queue. If the queue is empty, return `"-1"`. Otherwise string of value.
- `isEmpty()`: Checks whether the circular queue is empty or not. Return `"true"` or `"false"`.
- `isFull()`: Checks whether the circular queue is full or not. Return `"true"` or `"false"`.

### Examples

**Example 1:**
```
Input:
k = 3
operations = ["enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
values = [[1], [2], [3], [4], [], [], [], [4], []]
Output: true true true false 3 true true true 4
Explanation:
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False, the queue is full
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4
```

### Constraints

- `1 <= k <= 1000`
- `0 <= value <= 1000`
- At most 3000 calls will be made to `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.
