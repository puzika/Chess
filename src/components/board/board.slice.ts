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

type MovePayload = {
   position: string,
   piece: Piece,
   origin: Coords,
   target: Coords,
   captured: Piece | '',
}

function generateFenPositionFromBoard(board: string[][], player: Color): string {
   const fenArray: string[] = [];

   for (const row of board) {
      let rank: string = '';
      let countEmptyCells = 0;

      for (let i = 0; i < row.length; i++) {
         if (row[i] === '') countEmptyCells++;
         else {
            if (countEmptyCells !== 0) {
               rank += `${countEmptyCells}`;
               countEmptyCells = 0;
            }

            rank += row[i];
         }
      }

      if (!!countEmptyCells) rank += `${countEmptyCells}`;

      fenArray.push(rank);
   }

   return player === 'w' ? fenArray.join('/') : fenArray.join('/').split('').reverse().join('');
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      move: {
         reducer(state, action: PayloadAction<MovePayload>) {
            const { position, piece, target, origin, captured } = action.payload;

            if ((piece === 'P' || piece === 'p') && Math.abs(target.row - origin.row) === 2) {
               const rank: string = state.turn === 'w' ? '6' : '3';
               const file: string = FILES[target.col];

               state.enpassant = `${file}${rank}`;
            } else {
               state.enpassant = '-';
            }

            if (state.turn === 'b') state.fullmove += 1;

            // if (state.castling !== '-') state.castling = setCastling(state.castling, piece, origin, target, captured);
            
            state.position = position; 
            state.turn = state.turn === 'w' ? 'b' : 'w';
            state.halfmove = !!captured || piece === 'p' || piece === 'P' ? 0 : state.halfmove + 1;
         },

         prepare(origin: Coords, target: Coords, board: string[][], player: Color): { payload: MovePayload } {
            const captured = board[target.row][target.col] as Piece | '';

            board[target.row][target.col] = board[origin.row][origin.col];
            board[origin.row][origin.col] = '';

            const fenPosition: string = generateFenPositionFromBoard(board, player);

            return {
               payload: {
                  position: fenPosition,
                  piece: board[target.row][target.col] as Piece,
                  origin,
                  target,
                  captured
               }
            }
         }
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
