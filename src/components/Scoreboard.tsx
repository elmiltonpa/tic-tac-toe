import React from 'react';
import { Score, PlayerSymbol } from '../types';

interface ScoreboardProps {
  score: Score;
  currentPlayer: PlayerSymbol;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ score, currentPlayer }) => {
  return (
    <div className="flex justify-between items-center mb-4 w-full">
      <div className={`flex flex-col items-center justify-center aspect-square w-24 rounded-xl transition-all duration-300 ${currentPlayer === 'X' ? 'bg-blue-500/20 border-2 border-blue-500' : 'bg-gray-800/50 border border-gray-700'}`}>
        <span className="text-4xl font-bold text-blue-500">X</span>
        <span className="text-2xl font-mono text-white mt-1">{score.X}</span>
      </div>
      
      <div className="text-gray-500 font-bold">VS</div>

      <div className={`flex flex-col items-center justify-center aspect-square w-24 rounded-xl transition-all duration-300 ${currentPlayer === 'O' ? 'bg-red-500/20 border-2 border-red-500' : 'bg-gray-800/50 border border-gray-700'}`}>
        <span className="text-4xl font-bold text-red-500">O</span>
        <span className="text-2xl font-mono text-white mt-1">{score.O}</span>
      </div>
    </div>
  );
};
