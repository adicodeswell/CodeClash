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
  while (cursor < tokens.length && tokens[cursor] !== "") {
    const n = readInt();
    if (n === null) break;
    const edges = readIntMatrix();
    if (edges === null) break;
    const result = new Solution().findMinHeightTrees(n, edges);
    console.log(result.join(" "));
  }
}

main();
