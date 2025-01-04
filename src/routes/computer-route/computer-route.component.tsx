import GameContainer from "../../components/game/game.component"
import Board from "../../components/board/board.component"
import Form from "../../components/form/form.component"
import Timer from "../../components/timer/timer.component"
import TimerProvider from "../../components/timer/timer.context"

export default function ComputerRoute() {
   return (
      <>
         <Form />
         <GameContainer>
            <TimerProvider>
               <Board />
               <Timer />
            </TimerProvider>
         </GameContainer>
      </>
   )
}