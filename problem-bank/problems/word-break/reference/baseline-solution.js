export function solve(s, wordDict) {
  const words = new Set(wordDict);
  const memo = new Map();

  function canBreak(idx) {
    if (idx === s.length) return true;
    if (memo.has(idx)) return memo.get(idx);

    for (let end = idx + 1; end <= s.length; end++) {
      if (words.has(s.substring(idx, end)) && canBreak(end)) {
        memo.set(idx, true);
        return true;
      }
    }
    memo.set(idx, false);
    return false;
  }

  return canBreak(0);
}
