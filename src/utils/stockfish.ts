import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const MAX_DEPTH: number = 15;
export type RequestState = 'idle' | 'pending' | 'succeeded' | 'failed';

type Stockfish = {
   loading: RequestState,
   error: string | null,
   engineMove: string,
}

const initialState: Stockfish = {
   loading: 'idle',
   error: null,
   engineMove: '-',
}

export type Response = {
   success: boolean,
   error?: string,
   bestmove?: string,
   continuation?: string,
   evaluation?: number | null,
   mate?: number | null,
}

export const fetchEngineMove = createAsyncThunk(
   'fetch/bestMove',
   async (params: {fen: string, depth: number, signal: AbortSignal}, { rejectWithValue }) => {
      const { fen, depth, signal } = params;
      
      try {
         const response = await fetch(`https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`, { signal });

         if (response.status === 400) return rejectWithValue('Invalid request');
         if (response.status === 404) return rejectWithValue('The requested resource not found');
         if (!response.ok) return rejectWithValue('Oops! Something went wrong...');

         return response.json();
      } catch (err) {
         if (signal.aborted) return rejectWithValue('Aborted');
         return rejectWithValue('Oops! Something went wrong...');
      }
   }
);

export const stockfishSlice = createSlice({
   name: 'stockfish',
   initialState,
   reducers: {
      removeEngineMove: (state) => {
         state.engineMove = '-';
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchEngineMove.pending, (state) => {
            state.loading = 'pending';
         })
         .addCase(fetchEngineMove.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload as string | null;
         })
         .addCase(fetchEngineMove.fulfilled, (state, action) => {
            const response: Response = action.payload;
            const engineMove: string = (response.continuation ?? '').split(' ')[0];

            state.loading = 'succeeded';
            state.engineMove = engineMove || '-';
         });
   }
});

export const { removeEngineMove } = stockfishSlice.actions;

export const selectLoading = (state: RootState): RequestState => state.stockfish.loading;
export const selectError = (state: RootState): string | null => state.stockfish.error;
export const selectEngineMove = (state: RootState): string => state.stockfish.engineMove;

export default stockfishSlice.reducer;
