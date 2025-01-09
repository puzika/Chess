import { Color, Coords, Move, FILES, RANKS } from "./board.slice";
import * as svar from '../../variables.style';

const ROWS: number = 8;
const COLS: number = 8;

export const moveHighlight = `inset 0 0 1.5rem .5rem ${svar.clrHighlight}`;
export const captureHighlight = `inset 0 0 1.5rem .5rem ${svar.clrNeutralMax}`;
export const checkHighLight = `inset 0 0 1.5rem .5rem ${svar.clrHighlightCheck}`;

export function getCellColor(row: number, col: number): Color {
   return (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ? 'w' : 'b';
}

export function getIdxFromCoords(coords: Coords): number {
   return coords.row * COLS + coords.col;
}

export function getCoordsFromIdx(idx: number): Coords {
   return {
      row: Math.floor(idx / COLS),
      col: idx % COLS,
   }
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

export function generateFenPositionFromBoard(board: string[][], player: Color): string {
   if (player === 'b') {
      for (const row of board) row.reverse();
      board.reverse();
   }

   const fenArr: string[] = [];

   for (const row of board) {
      let fenRow: string = '';
      let countEmptyCells: number = 0;

      for (const char of row) {
         if (char === '') {
            countEmptyCells++;
         } else {
            if (countEmptyCells > 0) {
               fenRow += `${countEmptyCells}`;
               countEmptyCells = 0;
            }

            fenRow += char;
         }
      }

      if (countEmptyCells > 0) fenRow += `${countEmptyCells}`;

      fenArr.push(fenRow);
   }

   return fenArr.join('/');
}

export function getLegalMovesForPiece(pieceCoords: Coords, legalMoves: Map<number, Coords[]>): Set<number> {
   const idx: number = getIdxFromCoords(pieceCoords);
   const moves: Coords[] = legalMoves.get(idx) ?? [];
   const cellIndices: Set<number> = new Set();
   
   moves.forEach(move => cellIndices.add(getIdxFromCoords(move)));

   return cellIndices;
}

export function getUpdatedCastlingState(currCastlingState: string, board: string[][], player: Color): string {
   if (currCastlingState === '-') return currCastlingState;

   let castlingToRemove: string = '';
   const castlingData: [Coords, string, string][] = [
      [{ row: 0, col: 0 }, player === 'w' ? 'q' : 'K', player === 'w' ? 'r' : 'R'],
      [{ row: 0, col: COLS - 1 }, player === 'w' ? 'k' : 'Q', player === 'w' ? 'r' : 'R'],
      [{ row: ROWS - 1, col: 0 }, player === 'w' ? 'Q' : 'k', player === 'w' ? 'R' : 'r'],
      [{ row: ROWS - 1, col: COLS - 1 }, player === 'w' ? 'K' : 'q', player === 'w' ? 'R' : 'r'],
      [{ row: 0, col: player === 'w' ? 4 : 3 }, player === 'w' ? 'kq' : 'KQ', player === 'w' ? 'k' : 'K'],
      [{ row: ROWS - 1, col: player === 'w' ? 4 : 3 }, player === 'w' ? 'KQ' : 'kq', player === 'w' ? 'K' : 'k']
   ];

   for (const [cell, castling, piece] of castlingData) {
      const { row, col } = cell;

      if (board[row][col] !== piece) castlingToRemove += castling;
   }

   const updatedCastling: string = [...castlingToRemove].reduce((acc, curr) => acc.replace(curr, ''), currCastlingState);

   return updatedCastling === '' ? '-' : updatedCastling;
}

export function moveBoardPieces(board: string[][], move: Move): void {
   const cols = board[0].length;
   const { origin, target } = move;

   // if castling
   if (board[origin.row][origin.col].toLowerCase() === 'k' && Math.abs(target.col - origin.col) === 2) {
      if (target.col - origin.col < 0) {
         board[target.row][target.col + 1] = board[target.row][0];
         board[target.row][0] = '';
      } else {
         board[target.row][target.col - 1] = board[target.row][cols - 1];
         board[target.row][cols - 1] = '';
      }
   }

   // if enpassant
   if (
      board[origin.row][origin.col].toLowerCase() === 'p' && 
      target.col !== origin.col &&
      board[target.row][target.col] === ''
   ) {
      board[origin.row][target.col] = '';
   }

   board[target.row][target.col] = board[origin.row][origin.col];
   board[origin.row][origin.col] = '';
}

export function getEnpassantCell(piece: string, move: Move, player: Color): string {
   const { origin, target } = move;
   const ranks: string[] = player === 'w' ? [...RANKS].reverse() : RANKS;
   const files: string[] = player === 'w' ? FILES : [...FILES].reverse();

   if (piece.toLowerCase() !== 'p' || Math.abs(target.row - origin.row) !== 2) return '-';

   if (target.row - origin.row < 0) return `${files[target.col]}${ranks[target.row + 1]}`;
   
   return `${files[target.col]}${ranks[target.row - 1]}`;
}

export function isPromotion(target: Coords, piece: string): boolean {
   const { row } = target;

   return (row === 0 || row === ROWS - 1) && (piece.toLowerCase() === 'p');
}

export function hasLegalMoves(allLegalMoves: Map<number, Coords[]>): boolean {
   for (const [_, pieceLegalMoves] of allLegalMoves) {
      if (pieceLegalMoves.length > 0) return true;
   }

   return false;
}

export function getMoveNotation(move: Move, player: Color, promotion: string = ''): string {
   const { origin, target } = move;
   const { row: originRow, col: originCol } = origin;
   const { row: targetRow, col: targetCol } = target;
   const ranks: string[] = player === 'w' ? [...RANKS].reverse() : RANKS;
   const files: string[] = player === 'w' ? FILES : [...FILES].reverse();

   let notation: string = `${files[originCol]}${ranks[originRow]}${files[targetCol]}${ranks[targetRow]}` + promotion.toLowerCase();

   return notation;
}