import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type MovePosition = {
   notation: string,
   position: string,
}

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';

export type Analysis = {
   boardPositions: MovePosition[],
   currPositionIdx: number,
   loading: Loading,
   error: string | null,
   bestMove: string,
};

const initialState: Analysis = {
   boardPositions: [{ notation: 'initial', position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}],
   currPositionIdx: 0,
   loading: 'idle',
   error: null,
   bestMove: '',
};

type FetchData = {
   fen: string,
   depth: number,
   maxThinkingTime: number,
}

export const fetchBestMove = createAsyncThunk(
   'fetch/bestMove',
   async (fen: string, { rejectWithValue }) => {
      try {
         const data: FetchData = {
            fen,
            depth: 18,
            maxThinkingTime: 100,
         }

         console.log(data);

         const response = await fetch("https://chess-api.com/v1", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
         });

         return response.json();
      } catch (err) {
         return rejectWithValue('Oops, something went wrong!');
      }
   }
)

export const analysisSlice = createSlice({
   name: 'analysis',
   initialState,
   reducers: {
      addPosition: (state, action: PayloadAction<MovePosition>) => {
         const { notation, position } = action.payload;
         const boardPositions = state.boardPositions.slice(0, state.currPositionIdx + 1);

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
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchBestMove.pending, (state) => {
            state.loading = 'pending';
         })
         .addCase(fetchBestMove.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload as string | null;
         })
         .addCase(fetchBestMove.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.bestMove = action.payload?.move;
         });
   }
});

export const {
   addPosition,
   jumpBack,
   jumpForward,
   jumpToIdx
} = analysisSlice.actions;

export const selectBoardPositions = (state: RootState): MovePosition[] => state.analysis.boardPositions;
export const selectCurrPositionIdx = (state: RootState): number => state.analysis.currPositionIdx;
export const selectCurrPosition = (state: RootState): string => state.analysis.boardPositions[state.analysis.currPositionIdx].position;
export const selectLoading = (state: RootState): Loading => state.analysis.loading;
export const selectError = (state: RootState): string | null => state.analysis.error;
export const selectBestMove = (state: RootState): string => state.analysis.bestMove;

export default analysisSlice.reducer;