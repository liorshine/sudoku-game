
export function getHintExplanation(
  row: number,
  col: number,
  board: number[][],
  solution: number[][]
): { value: number; explanation: string } | null {
  if (board[row][col] !== 0) return null;

  const existingInRow = new Set(board[row]);
  const existingInCol = new Set(board.map(r => r[col]));

  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  const existingInBox = new Set<number>();
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      existingInBox.add(board[r][c]);
    }
  }

  const candidates: number[] = [];
  for (let n = 1; n <= 9; n++) {
    if (
      !existingInRow.has(n) &&
      !existingInCol.has(n) &&
      !existingInBox.has(n)
    ) {
      candidates.push(n);
    }
  }

  if (candidates.length !== 1) return null;

  const correctValue = solution[row][col];
  const explanation = `👉 Ô (${row + 1}, ${col + 1}) nên là số **${correctValue}** vì:
- Hàng ${row + 1} đã có: ${[...existingInRow].filter(n => n !== 0).join(', ') || '∅'}
- Cột ${col + 1} đã có: ${[...existingInCol].filter(n => n !== 0).join(', ') || '∅'}
- Khối 3x3 đã có: ${[...existingInBox].filter(n => n !== 0).join(', ') || '∅'}
⇒ Chỉ còn lại số phù hợp là: **${candidates.join(', ')}**
→ Đáp án chính xác là: **${correctValue}**`;

  return {
    value: correctValue,
    explanation,
  };
}


export function findHint(
  board: number[][],
  solution: number[][],
): { row: number; col: number; value: number; explanation: string } | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const hint = getHintExplanation(row, col, board, solution);
        if (hint) {
          return {
            row,
            col,
            value: hint.value,
            explanation: hint.explanation,
          };
        }
      }
    }
  }
  return null;
}

