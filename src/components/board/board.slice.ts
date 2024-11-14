import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

type Turn = 'w' | 'b';

type BoardState = {
   position: string,
   turn: Turn,
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

function generateFenPositionFromBoard(board: string[][]): string {
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

   return fenArray.join('/');
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      move: {
         reducer(state, action: PayloadAction<string>) {
            state.position = action.payload;
         },

         prepare(origin: Coords, target: Coords, board: string[][]): { payload: string } {
            board[target.row][target.col] = board[origin.row][origin.col];
            board[origin.row][origin.col] = '';

            const fenPosition: string = generateFenPositionFromBoard(board);

            return {
               payload: fenPosition,
            }
         }
      }
   }
});

export const { move } = boardSlice.actions;

export const selectPosition = (state: RootState): string => state.board.position;

export default boardSlice.reducer;
