import React, { useState, useEffect } from "react";
import { useTicTacToe } from "./hooks/useTicTacToe";
import { Scoreboard } from "./components/Scoreboard";
import { Board } from "./components/Board";

const App: React.FC = () => {
  const {
    board,
    handleClick,
    winningLine,
    score,
    isXNext,
    winner,
    isDraw,
    resetGame,
    resetScore,
  } = useTicTacToe();

  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    if (winner) {
      setStatusMessage(`${winner} wins!`);
    } else if (isDraw) {
      setStatusMessage("It's a draw!");
    } else {
      setStatusMessage(`It's ${isXNext ? "X" : "O"}'s turn`);
    }
  }, [winner, isDraw, isXNext]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="flex flex-col items-center w-[320px] sm:w-100">
        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-red-500 mb-8 tracking-tighter">
          TIC TAC TOE
        </h1>

        <Scoreboard score={score} currentPlayer={isXNext ? "X" : "O"} />

        <div className="relative w-full">
          <Board
            board={board}
            onClick={handleClick}
            winningLine={winningLine}
          />

          {(winner || isDraw) && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
              <div className="text-3xl font-bold mb-4 text-white">
                {winner ? `${winner} WINS!` : "DRAW!"}
              </div>
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        <button
          onClick={resetScore}
          className="mt-8 text-white hover:text-gray-300 text-sm font-medium tracking-widest transition-colors uppercase border-b border-transparent hover:border-white"
          title="Resets all scores to zero"
        >
          Reset Score
        </button>

        <footer className="mt-12 text-gray-300 text-xs font-mono flex gap-2 items-center">
          <span>Created by Milton Ibarra</span>
          <span>|</span>
          <a href="https://github.com/elmiltonpa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <span>|</span>
          <a href="https://github.com/elmiltonpa/tic-tac-toe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Source Code</a>
        </footer>

        <div aria-live="polite" className="sr-only">
          {statusMessage}
        </div>
      </div>
    </div>
  );
};

export default App;
