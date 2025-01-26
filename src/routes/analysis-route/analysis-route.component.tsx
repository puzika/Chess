import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateBoardState } from "../../components/board/board.slice";
import { selectCurrPosition } from "./analysis-route.slice";
import { selectGameState, setGameState, setGameType } from "../../components/game/game.slice";
import type { GameState } from "../../components/game/game.slice";
import GameContainer from "../../components/game/game.component";
import Board from "../../components/board/board.component";
import AnalysisTools from "../../components/analysis-tools/analysis-tools.component";

export default function AnalysisRoute() {
   const dispatch = useAppDispatch();
   const currPosition: string = useAppSelector(selectCurrPosition);
   const gameState: GameState = useAppSelector(selectGameState);

   useEffect(() => {
      dispatch(setGameType('analysis'));
      gameState === 'YET_TO_BEGIN' && dispatch(setGameState('IN_PROGRESS'));
   }, []);

   useEffect(() => {
      dispatch(updateBoardState(currPosition));
   }, [currPosition]);

   return (
      <GameContainer>
         <Board />
         <AnalysisTools />
      </GameContainer>
   )
}