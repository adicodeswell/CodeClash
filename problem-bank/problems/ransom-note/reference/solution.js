export function solve(ransomNote, magazine) {
  const counts = new Map();
  for (let i = 0; i < magazine.length; i++) {
    const ch = magazine[i];
    counts.set(ch, (counts.get(ch) || 0) + 1);
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const ch = ransomNote[i];
    const available = counts.get(ch) || 0;
    if (available <= 0) {
      return false;
    }
    counts.set(ch, available - 1);
  }

  return true;
}
