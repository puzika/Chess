import type { Color, Coords, Move } from "./board.slice";
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

export function getUpdatedCastlingState(currCastlingState: string, origin: Coords, player: Color): string {
   if (currCastlingState === '-') return currCastlingState;

   const originIdx: number = getIdxFromCoords(origin);
   const initialKingRookCells: Map<number, string> = new Map([
      [getIdxFromCoords({ row: 0, col: 0 }), player === 'w' ? 'q' : 'K'],
      [getIdxFromCoords({ row: 0, col: COLS - 1 }), player === 'w' ? 'k' : 'Q'],
      [getIdxFromCoords({ row: 0, col: 3 }), player === 'w' ? '' : 'KQ'],           //KING OR QUEEN POSITION
      [getIdxFromCoords({ row: 0, col: 4 }), player === 'w' ? 'kq' : ''],           //KING OR QUEEN POSITION
      [getIdxFromCoords({ row: ROWS - 1, col: 0 }), player === 'w' ? 'Q' : 'k'],
      [getIdxFromCoords({ row: ROWS - 1, col: COLS - 1 }), player === 'w' ? 'K' : 'q'],
      [getIdxFromCoords({ row: ROWS - 1, col: 3 }), player === 'w' ? '' : 'kq'],    //KING OR QUEEN POSITION
      [getIdxFromCoords({ row: ROWS - 1, col: 4 }), player === 'w' ? 'KQ' : ''],    //KING OR QUEEN POSITION
   ]);

   const stateToBeRemoved: string = initialKingRookCells.get(originIdx) ?? '';
   const newCastlingState: string = stateToBeRemoved === '' ? 
      currCastlingState : 
      [...stateToBeRemoved].reduce((newState, toBeRemoved) => newState = newState.replace(toBeRemoved, ''), currCastlingState);

   return newCastlingState || '-';
}

export function moveBoardPieces(board: string[][], move: Move): void {
   const [rows, cols] = [board.length, board[0].length];
   const { origin, target } = move;

   board[target.row][target.col] = board[origin.row][origin.col];
   board[origin.row][origin.col] = '';

   // if castling
   if (board[target.row][target.col].toLowerCase() === 'k' && Math.abs(target.col - origin.col) === 2) {
      if (target.col - origin.col < 0) {
         board[target.row][target.col + 1] = board[target.row][0];
         board[target.row][0] = '';
      } else {
         board[target.row][target.col - 1] = board[target.row][cols - 1];
         board[target.row][cols - 1] = '';
      }
   }
}