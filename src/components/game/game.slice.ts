import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Color } from "../board/board.slice";

type GameType = 'computer' | 'analysis';

type Game = {
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
      setTypeComputer: (state) => {
         state.type = 'computer';
      },

      setTypeAnalysis: (state) => {
         state.type = 'analysis';
      }
   },
});

export const {
   setTypeAnalysis,
   setTypeComputer,
} = gameSlice.actions;

export const selectType = (state: RootState): GameType => state.game.type;
export const selectPlayer = (state: RootState): Color => state.game.player;
export const selectTime = (state: RootState): number => state.game.time;
export const selectDepth = (state: RootState): number => state.game.depth;

export default gameSlice.reducer;