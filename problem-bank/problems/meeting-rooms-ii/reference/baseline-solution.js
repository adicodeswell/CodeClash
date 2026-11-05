export function solve(intervals) {
  const events = [];
  for (const [s, e] of intervals) {
    events.push([s, 1]);
    events.push([e, -1]);
  }
  events.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

  let maxRooms = 0;
  let cur = 0;
  for (const [time, type] of events) {
    cur += type;
    if (cur > maxRooms) maxRooms = cur;
  }
  return maxRooms;
}
