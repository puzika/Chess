import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type Analysis = {
   boardPositions: string[],
   currPositionIdx: number,
};

const initialState: Analysis = {
   boardPositions: [],
   currPositionIdx: -1,
};

export const analysisSlice = createSlice({
   name: 'analysis',
   initialState,
   reducers: {
      addPosition: (state, action: PayloadAction<string>) => {
         const newBoardPosition: string = action.payload;
         const boardPositions = state.boardPositions.slice(0, state.currPositionIdx + 1);

         if (newBoardPosition === boardPositions[state.currPositionIdx]) return state;

         state.boardPositions = [...boardPositions, newBoardPosition];
         state.currPositionIdx = state.currPositionIdx + 1;
      },
   },
});

export const {
   addPosition
} = analysisSlice.actions;

export const selectBoardPositions = (state: RootState): string[] => state.analysis.boardPositions;
export const selectCurrPosition = (state: RootState): number => state.analysis.currPositionIdx;

export default analysisSlice.reducer;