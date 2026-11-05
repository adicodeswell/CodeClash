export function solve(s) {
  const filtered = s.toLowerCase().split('').filter(c => /[a-z0-9]/.test(c)).join('');
  return filtered === filtered.split('').reverse().join('');
}
