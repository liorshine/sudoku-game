import React, { useEffect, useState } from 'react';
import { isValidMove } from '../utils/validateSudoku';
import './SudokuBoard.css';
import {getHintExplanation , findHint } from '../utils/getHintExplanation';
type Props = {
  initialBoard: number[][];
  solutionBoard: number[][];
};

export const SudokuBoard: React.FC<Props> = ({ initialBoard, solutionBoard }) => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [hintExplanation, setHintExplanation] = useState<string | null>(null);
  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const handleChange = (row: number, col: number, value: string) => {
    const number = parseInt(value);

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = isNaN(number) ? 0 : number;
    setBoard(newBoard);
  };

  const handleHint = () => {
  const newBoard = board.map((r) => [...r]);
  const hint = findHint(newBoard, solutionBoard);
  
  if (hint) {
    const { row, col, value, explanation } = hint;
    newBoard[row][col] = value;
    setBoard(newBoard);
    setHintExplanation(`Ô [${row + 1}, ${col + 1}]: ${explanation}`);
  } else {
    setHintExplanation('Không còn ô nào có thể suy luận logic để gợi ý!');
  }
};


  useEffect(() => {
    let isComplete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = board[r][c];
        if (val === 0 || !isValidMove(val, solutionBoard, r, c)) {
          isComplete = false;
          break;
        }
      }
      if (!isComplete) break;
    }

    if (isComplete) {
      setTimeout(() => {
        alert('Good.');
      }, 100);
    }
  }, [board, solutionBoard]);

  return (
    <div className="sudoku-container">
      <div className="sudoku-grid">
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
                className={`sudoku-cell
                    ${isFixed ? 'sudoku-fixed' : cell === 0 ? 'sudoku-empty' : isCorrect ? 'sudoku-correct' : 'sudoku-wrong'}
                    ${rowIndex % 3 === 0 ? 'bold-top' : ''}
                    ${colIndex % 3 === 0 ? 'bold-left' : ''}
                    ${(colIndex + 1) % 3 === 0 ? 'bold-right' : ''}
                    ${(rowIndex + 1) % 3 === 0 ? 'bold-bottom' : ''}
                `}
                />
            );
          })
        )}
      </div>
    <br />
    <div className="sudoku-actions">
    <button className="hint-button" onClick={handleHint}>
        Hint
    </button>
    {hintExplanation && (
        <p className="hint-text">{hintExplanation}</p>
    )}
    </div>
    </div>
  );
};
