export function solve(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  const letters = "abcdefghijklmnopqrstuvwxyz";

  let head = 0;
  while (head < queue.length) {
    const [word, step] = queue[head++];
    if (word === endWord) return step;

    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < 26; j++) {
        const next = word.slice(0, i) + letters[j] + word.slice(i + 1);
        if (wordSet.has(next) && !visited.has(next)) {
          visited.add(next);
          queue.push([next, step + 1]);
        }
      }
    }
  }

  return 0;
}
