import { Color } from "../components/board/board.slice";
import { ReactElement, createContext, useState } from "react";

type Game = 'analysis' | 'computer';

type GameContextType = {
   game: Game,
   player?: Color,
   setGame: (game: Game) => void,
   setPlayer: (player: Color) => void
};

export const GameContext = createContext<GameContextType>({
   game: 'analysis',
   player: 'w',
   setGame: (game: Game) => {},
   setPlayer: (player: Color) => {},
});

type GameProviderProps = {
   children?: ReactElement | ReactElement[]
}

export default function GameProvider({ children }: GameProviderProps) {
   const [game, setGame] = useState<Game>('analysis');
   const [player, setPlayer] = useState<Color>('w');

   const value: GameContextType = {
      game,
      player,
      setGame,
      setPlayer,
   }

   return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

