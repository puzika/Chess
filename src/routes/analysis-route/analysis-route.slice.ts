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
   boardPositions: [{ notation: 'initial', position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}],
   currPositionIdx: 0,
};

export const analysisSlice = createSlice({
   name: 'analysis',
   initialState,
   reducers: {
      addPosition: (state, action: PayloadAction<MovePosition>) => {
         const { notation, position } = action.payload;
         const boardPositions: MovePosition[] = state.boardPositions.slice(0, state.currPositionIdx + 1);

         const currPosition: MovePosition = boardPositions[state.currPositionIdx];

         if ((notation === currPosition.notation) || (position === currPosition.position)) return state;

         state.boardPositions = [...boardPositions, action.payload];
         state.currPositionIdx = state.currPositionIdx + 1;
      },

      jumpBack: (state) => {
         const prevIdx: number = state.currPositionIdx - 1;

         state.currPositionIdx = prevIdx < 0 ? state.currPositionIdx : prevIdx;
      },

      jumpForward: (state) => {
         const nextIdx: number = state.currPositionIdx + 1;

         state.currPositionIdx = nextIdx < state.boardPositions.length ? nextIdx : state.currPositionIdx;
      },

      jumpToIdx: (state, action: PayloadAction<number>) => {
         const idx: number = action.payload;

         if (idx < 0 || idx >= state.boardPositions.length) return state;

         state.currPositionIdx = idx;
      },

      resetAnalysis: () => {
         return initialState;
      }
   },
});

export const {
   addPosition,
   jumpBack,
   jumpForward,
   jumpToIdx,
   resetAnalysis
} = analysisSlice.actions;

export const selectBoardPositions = (state: RootState): MovePosition[] => state.analysis.boardPositions;
export const selectCurrPositionIdx = (state: RootState): number => state.analysis.currPositionIdx;
export const selectCurrPosition = (state: RootState): string => state.analysis.boardPositions[state.analysis.currPositionIdx].position;

export default analysisSlice.reducer;