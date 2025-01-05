import { useAppSelector } from "../../store/hooks"
import { selectOutcomeMessage } from "../../components/game/game.slice"
import GameContainer from "../../components/game/game.component"
import Board from "../../components/board/board.component"
import Form from "../../components/form/form.component"
import Timer from "../../components/timer/timer.component"
import TimerProvider from "../../components/timer/timer.context"
import Popup from "../../components/popup/popup.component"

export default function ComputerRoute() {
   const outcomeMessage: string = useAppSelector(selectOutcomeMessage);

   return (
      <>
         <Form />
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