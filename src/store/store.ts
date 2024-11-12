import { configureStore } from "@reduxjs/toolkit";
import board from '../components/board/board.slice';

export const store = configureStore({
   reducer: {
      board,
   },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];