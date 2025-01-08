import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type MovePosition = {
   notation: string,
   position: string,
}

export type Analysis = {
   boardPositions: MovePosition[],
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
      addPosition: (state, action: PayloadAction<MovePosition>) => {
         const { notation, position } = action.payload;
         const boardPositions = state.boardPositions.slice(0, state.currPositionIdx + 1);

         const currPosition: MovePosition | undefined = boardPositions[state.currPositionIdx];

         if (!!currPosition && (notation === currPosition.notation || position === currPosition.position)) return state;

         state.boardPositions = [...boardPositions, action.payload];
         state.currPositionIdx = state.currPositionIdx + 1;
      },
   },
});

export const {
   addPosition
} = analysisSlice.actions;

export const selectBoardPositions = (state: RootState): MovePosition[] => state.analysis.boardPositions;
export const selectCurrPosition = (state: RootState): number => state.analysis.currPositionIdx;

export default analysisSlice.reducer;