class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this._up(this.heap.length - 1);
  }
  pop() {
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._down(0);
    }
    return top;
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i] < this.heap[p]) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }
  _down(i) {
    const n = this.heap.length;
    while ((i << 1) + 1 < n) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let smallest = left;
      if (right < n && this.heap[right] < this.heap[left]) smallest = right;
      if (this.heap[smallest] < this.heap[i]) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
}

export function solve(k, nums, valList) {
  const heap = new MinHeap();
  for (const x of nums) {
    heap.push(x);
    if (heap.size() > k) heap.pop();
  }

  const result = [];
  for (const x of valList) {
    heap.push(x);
    if (heap.size() > k) heap.pop();
    result.push(heap.peek());
  }
  return result;
}
