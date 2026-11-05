import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

const VALID_SAMPLE = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];

function cloneBoard(b) {
  return b.map(row => [...row]);
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1 valid", inputs: { board: VALID_SAMPLE } });
  
  const invalidRow = cloneBoard(VALID_SAMPLE);
  invalidRow[0][2] = "5"; // duplicate 5 in row 0
  cases.push({ category: "basic", description: "Invalid duplicate in row", inputs: { board: invalidRow } });

  const invalidCol = cloneBoard(VALID_SAMPLE);
  invalidCol[2][0] = "5"; // duplicate 5 in col 0
  cases.push({ category: "basic", description: "Invalid duplicate in col", inputs: { board: invalidCol } });

  const invalidBox = cloneBoard(VALID_SAMPLE);
  invalidBox[1][1] = "5"; // duplicate 5 in box (0,0)
  cases.push({ category: "basic", description: "Invalid duplicate in box", inputs: { board: invalidBox } });

  const emptyBoard = Array.from({ length: 9 }, () => new Array(9).fill("."));
  cases.push({ category: "basic", description: "Completely empty board", inputs: { board: emptyBoard } });

  const singleDigit = cloneBoard(emptyBoard);
  singleDigit[4][4] = "7";
  cases.push({ category: "basic", description: "Single digit center", inputs: { board: singleDigit } });

  const fullRow = cloneBoard(emptyBoard);
  for (let c = 0; c < 9; c++) fullRow[0][c] = String(c + 1);
  cases.push({ category: "basic", description: "Full valid row", inputs: { board: fullRow } });

  const fullRowInvalid = cloneBoard(fullRow);
  fullRowInvalid[0][8] = "1";
  cases.push({ category: "basic", description: "Full invalid row", inputs: { board: fullRowInvalid } });

  const fullCol = cloneBoard(emptyBoard);
  for (let r = 0; r < 9; r++) fullCol[r][0] = String(r + 1);
  cases.push({ category: "basic", description: "Full valid col", inputs: { board: fullCol } });

  const fullColInvalid = cloneBoard(fullCol);
  fullColInvalid[8][0] = "1";
  cases.push({ category: "basic", description: "Full invalid col", inputs: { board: fullColInvalid } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const b = cloneBoard(emptyBoard);
    const isValid = i % 2 === 0;
    // Fill sub-box (i % 3, Math.floor(i / 5))
    const br = (i % 3) * 3;
    const bc = (Math.floor(i / 3) % 3) * 3;
    let num = 1;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        b[br + r][bc + c] = String(num++);
      }
    }
    if (!isValid) b[br + 2][bc + 2] = "1"; // duplicate in box
    cases.push({
      category: "edge",
      description: `Edge sub-box fill isValid=${isValid}`,
      inputs: { board: b }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const b = cloneBoard(VALID_SAMPLE);
    const isValid = i % 2 === 0;
    if (!isValid) {
      const r = (i % 9);
      b[r][1] = "9";
      b[r][7] = "9";
    }
    cases.push({
      category: "corner",
      description: `Corner modification ${i}`,
      inputs: { board: b }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const b = cloneBoard(VALID_SAMPLE);
    const numBlanks = randomInt(rng, 5, 20);
    for (let k = 0; k < numBlanks; k++) {
      b[randomInt(rng, 0, 8)][randomInt(rng, 0, 8)] = ".";
    }
    const isValid = i % 2 === 0;
    if (!isValid) {
      const r = randomInt(rng, 0, 8);
      b[r][0] = "9";
      b[r][8] = "9";
    }
    cases.push({
      category: "random",
      description: `Random partial board ${i}`,
      inputs: { board: b }
    });
  }

  // Stress (65 - 79)
  for (let i = 65; i < 80; i++) {
    const b = cloneBoard(VALID_SAMPLE);
    if (i % 2 === 1) {
      b[8][8] = b[8][7]; // duplicate in row 8
    }
    cases.push({
      category: "stress",
      description: `Stress board ${i}`,
      inputs: { board: b }
    });
  }

  return cases;
}
