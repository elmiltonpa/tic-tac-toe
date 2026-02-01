import React from 'react';
import { Player, WinningLine } from '../types';

interface BoardProps {
  board: Player[];
  onClick: (index: number) => void;
  winningLine: WinningLine;
}

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
  index: number;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning, index }) => {
  return (
    <button
      className={`
        aspect-square
        bg-gray-800/80
        border-2 rounded-xl 
        text-7xl font-bold 
        flex items-center justify-center 
        transition-all duration-200 
        hover:bg-gray-700
        active:scale-95
        ${isWinning 
          ? 'border-yellow-500 bg-yellow-500/10' 
          : 'border-gray-700 shadow-lg'}
        ${value === 'X' ? 'text-blue-500' : 'text-red-500'}
      `}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`Square ${index + 1}, ${value || 'empty'}`}
    >
      {value}
    </button>
  );
};

export const Board: React.FC<BoardProps> = ({ board, onClick, winningLine }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-3 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-2xl">
      {board.map((player, index) => (
        <Square
          key={index}
          value={player}
          onClick={() => onClick(index)}
          isWinning={winningLine?.includes(index) ?? false}
          index={index}
        />
      ))}
    </div>
  );
};
