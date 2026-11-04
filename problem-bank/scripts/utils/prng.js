// Deterministic Mulberry32 Pseudo-Random Number Generator.
// Guarantees exact reproducible test sets across platforms and environments.

export function createRng(seed = 12345) {
  let s = Math.floor(seed) >>> 0;
  return function next() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function pickRandom(rng, array) {
  return array[randomInt(rng, 0, array.length - 1)];
}

export function shuffle(rng, array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(rng, 0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
