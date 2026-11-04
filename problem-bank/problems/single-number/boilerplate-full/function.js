const fs = require("fs");

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

const tokens = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;

function readInt() {
  if (cursor >= tokens.length || tokens[cursor] === "") {
    return null;
  }

  const value = Number(tokens[cursor++]);

  if (!Number.isSafeInteger(value)) {
    throw new Error("Expected a safe integer");
  }

  return value;
}

function readIntList() {
  const n = readInt();

  if (n === null) {
    return null;
  }

  if (n < 0) {
    throw new Error("Negative list length");
  }

  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    const val = readInt();
    if (val === null) throw new Error("Unexpected end of input");
    arr[i] = val;
  }
  return arr;
}

function main() {
  while (cursor < tokens.length && tokens[cursor] !== "") {
    const nums = readIntList();
    if (nums === null) break;
    const result = new Solution().singleNumber(nums);
    console.log(result);
  }
}

main();
