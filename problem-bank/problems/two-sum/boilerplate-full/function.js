const fs = require("node:fs");

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

const tokens = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let cursor = 0;

function readInt() {
  if (cursor >= tokens.length || tokens[cursor] === "") {
    throw new Error("Missing integer input");
  }

  const value = Number(tokens[cursor++]);

  if (!Number.isSafeInteger(value)) {
    throw new Error("Expected a safe integer");
  }

  return value;
}

function readIntList() {
  const n = readInt();

  if (n < 0) {
    throw new Error("Negative list length");
  }

  return Array.from({ length: n }, readInt);
}

function main() {
  const nums = readIntList();
  const target = readInt();
  const result = new Solution().twoSum(nums, target);
  console.log(result.join(" "));
}

main();
