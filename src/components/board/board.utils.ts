import type { Color } from "./board.slice";

export function getCellColor(row: number, col: number): Color {
   return (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ? 'w' : 'b';
}

export function generateBoardFromFen(fen: string): string[][] {
   const board: string[][] = [];
   const fenRows: string[] = fen.split('/');

   for (const row of fenRows) {
      const boardRow: string[] = [];

      for (const char of row) {
         if (isFinite(Number(char))) {
            for (let i = 0; i < Number(char); i++) boardRow.push('');
         } else {
            boardRow.push(char);
         }
      }

      board.push(boardRow);
   }

   return board;
}