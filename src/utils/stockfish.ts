import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type RequestState = 'idle' | 'pending' | 'succeeded' | 'failed';

type Stockfish = {
   loading: RequestState,
   error: string | null,
   bestMove: string,
}

const initialState: Stockfish = {
   loading: 'idle',
   error: null,
   bestMove: '-',
}

export type Response = {
   success: boolean,
   error?: string,
   bestmove?: string,
   continuation?: string,
   evaluation?: number | null,
   mate?: number | null,
}

export const fetchBestMove = createAsyncThunk(
   'fetch/bestMove',
   async (fen: string, { rejectWithValue }) => {
      try {
         const depth: number = 15;

         const response = await fetch(`https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`);

         if (response.status === 400) return rejectWithValue('Invalid request');
         if (response.status === 404) return rejectWithValue('The requested resource not found');

         if (!response.ok) return rejectWithValue('Oops! Something went wrong...');

         return response.json();
      } catch (err) {
         return rejectWithValue('Oops! Something went wrong...');
      }
   }
);

export const stockfishSlice = createSlice({
   name: 'stockfish',
   initialState,
   reducers: {
      removeBestMove: (state) => {
         state.bestMove = '';
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
            const response: Response = action.payload;
            const bestMove: string = (response.continuation ?? '').split(' ')[0];

            state.loading = 'succeeded';
            state.bestMove = bestMove ?? '';
         });
   }
});

export const { removeBestMove } = stockfishSlice.actions;

export const selectLoading = (state: RootState): RequestState => state.stockfish.loading;
export const selectError = (state: RootState): string | null => state.stockfish.error;
export const selectBestMove = (state: RootState): string => state.stockfish.bestMove;

export default stockfishSlice.reducer;
