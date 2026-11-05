export function solve(cardPoints, k) {
  const n = cardPoints.length;
  const windowSize = n - k;
  let totalSum = 0;
  for (const x of cardPoints) totalSum += x;
  if (windowSize === 0) return totalSum;

  let cur = 0;
  for (let i = 0; i < windowSize; i++) cur += cardPoints[i];
  let minWindow = cur;

  for (let i = windowSize; i < n; i++) {
    cur += cardPoints[i] - cardPoints[i - windowSize];
    if (cur < minWindow) minWindow = cur;
  }

  return totalSum - minWindow;
}
