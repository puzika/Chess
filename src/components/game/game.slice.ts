import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Color } from "../board/board.slice";

type GameType = 'computer' | 'analysis';

type Game = {
   type: GameType,
   player: Color,
   time: number,
};

const initialState: Game = {
   type: "analysis",
   player: 'w',
   time: Infinity,
}

export const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {},
});

export const selectType = (state: RootState): GameType => state.game.type;
export const selectPlayer = (state: RootState): Color => state.game.player;
export const selectTime = (state: RootState): number => state.game.time;

export default gameSlice.reducer;