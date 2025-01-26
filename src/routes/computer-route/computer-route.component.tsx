import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { selectOutcomeMessage, selectGameState, setGameType, setGameState } from "../../components/game/game.slice"
import { selectCurrPositionIdx } from "../analysis-route/analysis-route.slice"
import type { GameState } from "../../components/game/game.slice"
import GameContainer from "../../components/game/game.component"
import Board from "../../components/board/board.component"
import Form from "../../components/form/form.component"
import Timer from "../../components/timer/timer.component"
import TimerProvider from "../../components/timer/timer.context"
import Popup from "../../components/popup/popup.component"
import { useEffect } from "react"

export default function ComputerRoute() {
   const dispatch = useAppDispatch();
   const outcomeMessage: string = useAppSelector(selectOutcomeMessage);
   const gameState: GameState = useAppSelector(selectGameState);
   const currPositionIdx: number = useAppSelector(selectCurrPositionIdx);

   useEffect(() => {
      dispatch(setGameType('computer'));
      currPositionIdx === 0 && dispatch(setGameState('YET_TO_BEGIN'));
   }, []);

   return (
      <>
         { gameState === 'YET_TO_BEGIN' && <Form /> }
         { outcomeMessage !== '' && <Popup message={outcomeMessage} /> }
         <GameContainer>
            <TimerProvider>
               <Board />
               <Timer />
            </TimerProvider>
         </GameContainer>
      </>
   )
}