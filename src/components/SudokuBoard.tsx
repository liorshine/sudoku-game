import React, { useEffect, useState } from 'react';
import { isValidMove } from '../utils/validateSudoku';

type Props = {
  initialBoard: number[][];
  solutionBoard: number[][];
};

export const SudokuBoard: React.FC<Props> = ({ initialBoard, solutionBoard }) => {
  const [board, setBoard] = useState<number[][]>(initialBoard);

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const handleChange = (row: number, col: number, value: string) => {
    const number = parseInt(value);
    if (isNaN(number) || number < 1 || number > 9) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = number;
    setBoard(newBoard);
  };

  const handleCheckBoard = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const value = board[r][c];
        if (value !== 0 && !isValidMove(value, solutionBoard, r, c)) {
          alert('There are invalid moves.');
          return;
        }
      }
    }
    alert('Sudoku is valid!');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '376px',
          height: '376px',
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 40px)',
          gridTemplateRows: 'repeat(9, 40px)',
          gap: '2px',
          border: '3px solid black',
          boxSizing: 'border-box',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isFixed = initialBoard[rowIndex][colIndex] !== 0;
            const isCorrect = isValidMove(cell, solutionBoard, rowIndex, colIndex);
            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength={1}
                value={cell === 0 ? '' : cell}
                disabled={isFixed}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                style={{
                  width: '40px',
                  height: '40px',
                  textAlign: 'center',
                  fontSize: '20px',
                  border: '1px solid gray',
                  backgroundColor: isFixed
                    ? '#ccc'
                    : cell === 0
                    ? '#fff'
                    : isCorrect
                    ? '#d4f8d4'
                    : '#f8d4d4',
                }}
              />
            );
          })
        )}
      </div>

      <button onClick={handleCheckBoard}>Check</button>
    </div>
  );
};
