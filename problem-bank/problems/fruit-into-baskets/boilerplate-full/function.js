const fs = require("fs");

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

const tokens = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;

function readStr() {
  if (cursor >= tokens.length || tokens[cursor] === "") return null;
  return tokens[cursor++];
}

function readInt() {
  const s = readStr();
  return s === null ? null : Number(s);
}

function readFloat() {
  const s = readStr();
  return s === null ? null : parseFloat(s);
}

function readBool() {
  const s = readStr();
  return s === null ? null : s === "1";
}

function readIntList() {
  const n = readInt();
  if (n === null) return null;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = readInt();
  return arr;
}

function readStrList() {
  const n = readInt();
  if (n === null) return null;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = readStr();
  return arr;
}

function readIntMatrix() {
  const r = readInt();
  if (r === null) return null;
  const mat = new Array(r);
  for (let i = 0; i < r; i++) mat[i] = readIntList();
  return mat;
}

function readStrMatrix() {
  const r = readInt();
  if (r === null) return null;
  const mat = new Array(r);
  for (let i = 0; i < r; i++) mat[i] = readStrList();
  return mat;
}

function main() {
  let _cc_max_ms = 0;
  while (cursor < tokens.length && tokens[cursor] !== "") {
    const fruits = readIntList();
    if (fruits === null) break;
    const _cc_t0 = performance.now();
    const result = new Solution().totalFruit(fruits);
    const _cc_t1 = performance.now();
    const _cc_dur = _cc_t1 - _cc_t0;
    if (_cc_dur > _cc_max_ms) _cc_max_ms = _cc_dur;
    console.log(result);
  }
  process.stderr.write("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ms)) + "\n");
}

main();
