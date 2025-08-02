import React, { useState } from "react";
import { SudokuBoard } from "./components/SudokuBoard";
import { generateSudoku } from "./utils/generateSudoku";

function App() {
  const [game, setGame] = useState(() => generateSudoku());

  const handleNewGame = () => {
    setGame(generateSudoku());
  };

  return (
    <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      textAlign: "center",
    }}
>
  <h1 style={{ marginBottom: 20 }}>Sudoku Game</h1>
  <SudokuBoard initialBoard={game.puzzle} solutionBoard={game.solution} />
  <button style={{ marginTop: 20 }} onClick={handleNewGame}>
    New Puzzle
  </button>
</div>

  );
}

export default App;
