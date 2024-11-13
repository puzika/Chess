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

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      move: {
         reducer(state, action: PayloadAction<{origin: Coords, target: Coords}>) {
            console.log(action.payload);
         },

         prepare(origin: Coords, target: Coords) {
            return {
               payload: {
                  origin,
                  target
               }
            }
         }
      }
   }
});

export const { move } = boardSlice.actions;

export const selectPosition = (state: RootState): string => state.board.position;

export default boardSlice.reducer;
