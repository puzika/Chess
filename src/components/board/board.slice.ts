import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

type BoardState = {
   position: string,
   turn: string,
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
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {}
});

export const selectPosition = (state: RootState): string => state.board.position;
export default boardSlice.reducer;
