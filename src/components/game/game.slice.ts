import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import type { Color } from "../board/board.slice";
import type { GameOutcome, GameData } from "./game.utils";
import { getGameOutcome } from "./game.utils";

type GameType = 'computer' | 'analysis';
export type GameState = 'YET_TO_BEGIN' | 'IN_PROGRESS' | 'FINISHED';

export type Game = {
   type: GameType,
   player: Color,
   timePlayer: number,
   timeComputer: number,
   depth: number,
   outcomeMessage: string,
   gameState: GameState, 
};

const initialState: Game = {
   type: "analysis",
   player: 'w',
   timePlayer: Infinity,
   timeComputer: Infinity,
   depth: 10,
   outcomeMessage: '',
   gameState: 'YET_TO_BEGIN',
}

export const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {
      startGame: (_, action: PayloadAction<Game>) => {
         return action.payload;
      },

      setOutcomeMessage: (state, action: PayloadAction<GameData>) => {
         const { player } = state;
         const { turn } = action.payload;
         const outcomeMessages: Record<GameOutcome, string> = {
            "checkmate": `${turn === 'w' ? 'Black' : 'White'} wins by checkmate`,
            "stalemate": 'Draw by stalemate',
            "inssuficient material": 'Draw by insufficient material',
            "time control": `${turn === 'w' ? 'Black' : 'White'} wins on time`,
            "resignation": `${player === 'w' ? 'White' : 'Black' } resigned`,
            "-": '',
         };

         const outcome: GameOutcome = getGameOutcome(action.payload);
         state.outcomeMessage = outcomeMessages[outcome];
         state.gameState = outcome === '-' ? state.gameState : 'FINISHED';
      },

      setTime: (state, action: PayloadAction<{ timePlayer: number, timeComputer: number}>) => {
         const { timeComputer, timePlayer } = action.payload;
         const playerMinutes: number = timePlayer / 1000 / 60;
         const computerMinutes: number = timeComputer / 1000 / 60;

         state.timePlayer = playerMinutes;
         state.timeComputer = computerMinutes;
      }
   },
});

export const {
   startGame,
   setOutcomeMessage,
   setTime,
} = gameSlice.actions;

export const selectType = (state: RootState): GameType => state.game.type;
export const selectPlayer = (state: RootState): Color => state.game.player;
export const selectTimePlayer = (state: RootState): number => state.game.timePlayer;
export const selectTimeComputer = (state: RootState): number => state.game.timeComputer;
export const selectDepth = (state: RootState): number => state.game.depth;
export const selectOutcomeMessage = (state: RootState): string => state.game.outcomeMessage;
export const selectGameState = (state: RootState): GameState => state.game.gameState;

export default gameSlice.reducer;