import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

export type Color = 'w' | 'b';
export type Piece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p' | 'R' | 'N' | 'B' | 'Q' | 'K' | 'P';
export const FILES: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

type BoardState = {
   position: string,
   turn: Color,
   castling: string,
   enpassant: string,
   halfmove: number,
   fullmove: number,
};

const initialState: BoardState = {
   position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
   turn: 'w',
   castling: 'KQkq',
   enpassant: '-',
   halfmove: 0,
   fullmove: 1,
};

export type Coords = {
   row: number,
   col: number,
}

export type Move = {
   origin: Coords,
   target: Coords,
}

type MovePayload = {
   moveCoords: Move,
   player: Color,
   board: string[][],
}

function generateFenPositionFromBoard(board: string[][], player: Color): string {
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

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      move: (state, action: PayloadAction<MovePayload>) => {
         const { moveCoords, player, board } = action.payload;
         const { origin, target } = moveCoords;

         state.halfmove = board[target.row][target.col] !== '' || board[origin.row][origin.col].toLowerCase() === 'p' ? state.halfmove + 1 : 0;
         state.fullmove = state.turn === 'b' ? state.fullmove + 1 : state.fullmove;
         state.turn = state.turn === 'w' ? 'b' : 'w';

         board[target.row][target.col] = board[origin.row][origin.col];
         board[origin.row][origin.col] = '';
         state.position = generateFenPositionFromBoard(board, player);
      }
   }
});

export const { move } = boardSlice.actions;

export const selectPosition = (state: RootState): string => state.board.position;
export const selectTurn = (state: RootState): Color => state.board.turn;
export const selectCastling = (state: RootState): string => state.board.castling;
export const selectEnpassant = (state: RootState): string => state.board.enpassant;
export const selectHalfMove = (state: RootState): number => state.board.halfmove;
export const selectFullMove = (state: RootState): number => state.board.fullmove;

export default boardSlice.reducer;
