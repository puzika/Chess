import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Color } from "../board/board.slice";

type GameType = 'computer' | 'analysis';

export type Game = {
   type: GameType,
   player: Color,
   time: number,
   depth: number,
};

const initialState: Game = {
   type: "analysis",
   player: 'w',
   time: Infinity,
   depth: 10,
}

export const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {
      startGame: (_, action: PayloadAction<Game>) => {
         return action.payload;
      }
   },
});

export const {
   startGame
} = gameSlice.actions;

export const selectType = (state: RootState): GameType => state.game.type;
export const selectPlayer = (state: RootState): Color => state.game.player;
export const selectTime = (state: RootState): number => state.game.time;
export const selectDepth = (state: RootState): number => state.game.depth;

export default gameSlice.reducer;