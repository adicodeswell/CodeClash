export function solve(strs) {
  // Step 1: Encode using length prefix and delimiter: `${length}#${str}`
  let encoded = "";
  for (const s of strs) {
    encoded += s.length + "#" + s;
  }

  // Step 2: Decode back to list of strings
  const decoded = [];
  let i = 0;
  while (i < encoded.length) {
    const hashIdx = encoded.indexOf("#", i);
    const len = parseInt(encoded.substring(i, hashIdx), 10);
    const str = encoded.substring(hashIdx + 1, hashIdx + 1 + len);
    decoded.push(str);
    i = hashIdx + 1 + len;
  }

  return decoded;
}
