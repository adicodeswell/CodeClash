export function solve(cardPoints, k) {
  let leftSum = 0;
  for (let i = 0; i < k; i++) leftSum += cardPoints[i];
  let max = leftSum;
  let rightSum = 0;
  for (let i = 0; i < k; i++) {
    leftSum -= cardPoints[k - 1 - i];
    rightSum += cardPoints[cardPoints.length - 1 - i];
    if (leftSum + rightSum > max) max = leftSum + rightSum;
  }
  return max;
}
