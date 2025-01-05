import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import type { Color } from "../board/board.slice";
import type { GameOutcome, GameData } from "./game.utils";
import { getGameOutcome } from "./game.utils";

type GameType = 'computer' | 'analysis';

export type Game = {
   type: GameType,
   player: Color,
   time: number,
   depth: number,
   outcomeMessage: string,
};

const initialState: Game = {
   type: "analysis",
   player: 'w',
   time: Infinity,
   depth: 10,
   outcomeMessage: '',
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
      },
   },
});

export const {
   startGame,
   setOutcomeMessage,
} = gameSlice.actions;

export const selectType = (state: RootState): GameType => state.game.type;
export const selectPlayer = (state: RootState): Color => state.game.player;
export const selectTime = (state: RootState): number => state.game.time;
export const selectDepth = (state: RootState): number => state.game.depth;
export const selectOutcomeMessage = (state: RootState): string => state.game.outcomeMessage; 

export default gameSlice.reducer;