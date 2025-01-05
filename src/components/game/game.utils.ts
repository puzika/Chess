import type { Color, Coords } from "../board/board.slice";
import { getCellColor } from "../board/board.utils";

export type GameData = {
   isChecked: boolean,
   hasLegalMoves: boolean,
   turn: Color,
   board: string[][],
   isTimeOver: boolean,
   resigned: boolean,
}

export type GameOutcome = 'checkmate' | 'stalemate' | 'inssuficient material' | 'time control' | 'resignation' | '-';

function isCheckmate(gameData: GameData): boolean {
   const { isChecked, hasLegalMoves } = gameData;

   return isChecked && !hasLegalMoves;
}

function isStalemate(gameData: GameData): boolean {
   const { isChecked, hasLegalMoves } = gameData;

   return !isChecked && !hasLegalMoves;
}

function isInsufficientMaterial(gameData: GameData): boolean {
   const { board } = gameData;
   const [rows, cols]: [number, number] = [board.length, board[0].length]; 
   const possibleScenarios: [string, string][] = [['k', 'k'], ['k', 'bk'], ['bk', 'k'], ['k', 'kn'], ['kn', 'k'], ['bk', 'bk']];
   let whitePieces: string = '';
   let blackPieces: string = '';

   const areBishopsOnSameColor = (): boolean => {
      const coordsWhiteBishop: Coords = { row: -1, col: -1 };
      const coordsBlackBishop: Coords = { row: -1, col: -1 };

      for (let i: number = 0; i < rows; i++) {
         if (
            (coordsWhiteBishop.row !== -1 && coordsBlackBishop.col !== -1) &&
            (coordsBlackBishop.row !== -1 && coordsBlackBishop.col !== -1)
         ) break;

         for (let j: number = 0; j < cols; j++) {
            if (board[i][j] === '') continue;

            if (board[i][j] === 'b') {
               coordsBlackBishop.row = i;
               coordsBlackBishop.col = j;
            } else if (board[i][j] === 'B') {
               coordsWhiteBishop.row = i;
               coordsWhiteBishop.col = j;
            }
         }
      }

      const blackBishopSquareColor: Color = getCellColor(coordsBlackBishop.row, coordsBlackBishop.col);
      const whiteBishopSquareColor: Color = getCellColor(coordsWhiteBishop.row, coordsWhiteBishop.col);

      return blackBishopSquareColor === whiteBishopSquareColor;
   }

   for (const row of board) {
      for (const piece of row) {
         if (piece === '') continue;

         if (piece.toLowerCase() === piece) blackPieces += piece.toLowerCase();
         else whitePieces += piece.toLowerCase();
      }
   }
   
   for (const [white, black] of possibleScenarios) {
      const whitePiecesSorted: string = whitePieces.split('').sort().join('');
      const blackPiecesSorted: string = blackPieces.split('').sort().join('');

      if (white === whitePiecesSorted && black === blackPiecesSorted) {
         if (white === 'bk' && black === 'bk' && !areBishopsOnSameColor()) return false;

         return true;
      }
   }

   return false;
}

function isTimeControl(gameData: GameData): boolean {
   const { isTimeOver } = gameData;

   return isTimeOver;
}

function resigned(gameData: GameData): boolean {
   const { resigned } = gameData;
   
   return resigned; 
}

export function getGameOutcome(gameData: GameData): GameOutcome {
   if (isCheckmate(gameData)) return 'checkmate';
   if (isStalemate(gameData)) return 'stalemate';
   if (isInsufficientMaterial(gameData)) return 'inssuficient material';
   if (isTimeControl(gameData)) return 'time control';
   if (resigned(gameData)) return 'resignation';

   return '-';
}