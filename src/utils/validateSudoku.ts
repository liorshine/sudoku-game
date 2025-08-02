// utils/validateSudoku.ts

export function isValidMove(
  value: number,
  solutionBoard: number[][],
  row: number,
  col: number
): boolean {
  return value === solutionBoard[row][col];
}
