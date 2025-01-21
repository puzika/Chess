import { configureStore } from "@reduxjs/toolkit";
import game from '../components/game/game.slice';
import board from '../components/board/board.slice';
import analysis from '../routes/analysis-route/analysis-route.slice';
import stockfish from '../utils/stockfish';

export const store = configureStore({
   reducer: {
      board,
      game,
      analysis,
      stockfish,
   },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];