export function solve(board) {
  // Check rows
  for (let r = 0; r < 9; r++) {
    const seen = new Set();
    for (let c = 0; c < 9; c++) {
      const v = board[r][c];
      if (v !== ".") {
        if (seen.has(v)) return false;
        seen.add(v);
      }
    }
  }

  // Check columns
  for (let c = 0; c < 9; c++) {
    const seen = new Set();
    for (let r = 0; r < 9; r++) {
      const v = board[r][c];
      if (v !== ".") {
        if (seen.has(v)) return false;
        seen.add(v);
      }
    }
  }

  // Check 3x3 boxes
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const seen = new Set();
      for (let r = br * 3; r < br * 3 + 3; r++) {
        for (let c = bc * 3; c < bc * 3 + 3; c++) {
          const v = board[r][c];
          if (v !== ".") {
            if (seen.has(v)) return false;
            seen.add(v);
          }
        }
      }
    }
  }

  return true;
}
