export function solve(strs) {
  // Alternative encoding with delimiter parsing
  let encoded = "";
  for (let s of strs) {
    encoded += s.length.toString() + "@" + s;
  }

  const result = [];
  let idx = 0;
  while (idx < encoded.length) {
    let delim = encoded.indexOf("@", idx);
    let size = Number(encoded.slice(idx, delim));
    result.push(encoded.slice(delim + 1, delim + 1 + size));
    idx = delim + 1 + size;
  }
  return result;
}
