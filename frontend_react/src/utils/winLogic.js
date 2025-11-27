const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diag
];

// PUBLIC_INTERFACE
export function computeWinner(cells) {
  /** Compute winner for a 3x3 grid. Returns 'X' | 'O' | null */
  for (const [a,b,c] of LINES) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isDraw(cells) {
  /** Returns true if the grid is full and there is no winner. */
  return !computeWinner(cells) && cells.every(Boolean);
}

// PUBLIC_INTERFACE
export function getWinningLine(cells) {
  /** Returns the winning triple indices or null */
  for (const triplet of LINES) {
    const [a,b,c] = triplet;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return triplet;
  }
  return null;
}
