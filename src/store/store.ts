import { configureStore } from "@reduxjs/toolkit";
import game from '../components/game/game.slice';
import board from '../components/board/board.slice';

export const store = configureStore({
   reducer: {
      board,
      game,
   },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];