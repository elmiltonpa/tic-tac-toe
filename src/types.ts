export type PlayerSymbol = 'X' | 'O';
export type Player = PlayerSymbol | null;
export type WinningLine = [number, number, number] | null;

export interface Score {
  X: number;
  O: number;
}
