import { useState, useCallback } from "react";
import { Player, PlayerSymbol, WinningLine, Score } from "../types";

const WINNING_COMBINATIONS: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const useTicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });
  const [startingPlayer, setStartingPlayer] = useState<PlayerSymbol>("X");

  const calculateWinner = (
    currentBoard: Player[],
  ): { winner: Player; line: WinningLine } => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: null };
  };

  const { winner, line: winningLine } = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = useCallback(
    (index: number) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      const currentPlayer = isXNext ? "X" : "O";
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const result = calculateWinner(newBoard);

      if (result.winner) {
        setScore((prev) => ({
          ...prev,
          [result.winner as PlayerSymbol]:
            prev[result.winner as PlayerSymbol] + 1,
        }));
      } else {
        setIsXNext(!isXNext);
      }
    },
    [board, isXNext, winner],
  );

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    const nextStarter: PlayerSymbol = startingPlayer === "X" ? "O" : "X";
    setStartingPlayer(nextStarter);
    setIsXNext(nextStarter === "X");
  }, [startingPlayer]);

  const resetScore = useCallback(() => {
    setScore({ X: 0, O: 0 });
    setBoard(Array(9).fill(null));
    setStartingPlayer("X");
    setIsXNext(true);
  }, []);

  return {
    board,
    isXNext,
    winner,
    winningLine,
    score,
    isDraw,
    handleClick,
    resetGame,
    resetScore,
  };
};
