import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateBoardState } from "../../components/board/board.slice";
import { selectCurrPosition } from "./analysis-route.slice";
import GameContainer from "../../components/game/game.component";
import Board from "../../components/board/board.component";
import AnalysisTools from "../../components/analysis-tools/analysis-tools.component";

export default function AnalysisRoute() {
   const dispatch = useAppDispatch();
   const currPosition = useAppSelector(selectCurrPosition);

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