import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';

type Stockfish = {
   loading: Loading,
   error: string | null,
   bestMove: string,
}

const initialState: Stockfish = {
   loading: 'idle',
   error: null,
   bestMove: '-',
}

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

         const response = await fetch("https://chess-api.com/v1", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
         });

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
   reducers: {},
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

export const selectLoading = (state: RootState): Loading => state.stockfish.loading;
export const selectError = (state: RootState): string | null => state.stockfish.error;
export const selectBestMove = (state: RootState): string => state.stockfish.bestMove;

export default stockfishSlice.reducer;
