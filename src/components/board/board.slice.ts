import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { generateFenPositionFromBoard, getUpdatedCastlingState, getEnpassantCell, moveBoardPieces } from "./board.utils";

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

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      movePlayer: (state, action: PayloadAction<MovePayload>) => {
         const { moveCoords, player, board } = action.payload;
         const { origin, target } = moveCoords;

         state.halfmove = board[target.row][target.col] !== '' || board[origin.row][origin.col].toLowerCase() === 'p' ? 0 : state.halfmove + 1;
         state.fullmove = state.turn === 'b' ? state.fullmove + 1 : state.fullmove;
         state.turn = state.turn === 'w' ? 'b' : 'w';
         state.castling = getUpdatedCastlingState(state.castling, origin, player);
         state.enpassant = getEnpassantCell(board[origin.row][origin.col], moveCoords, player);

         moveBoardPieces(board, moveCoords);
         state.position = generateFenPositionFromBoard(board, player);
      }
   }
});

export const { movePlayer } = boardSlice.actions;

export const selectPosition = (state: RootState): string => state.board.position;
export const selectTurn = (state: RootState): Color => state.board.turn;
export const selectCastling = (state: RootState): string => state.board.castling;
export const selectEnpassant = (state: RootState): string => state.board.enpassant;
export const selectHalfMove = (state: RootState): number => state.board.halfmove;
export const selectFullMove = (state: RootState): number => state.board.fullmove;

export default boardSlice.reducer;
