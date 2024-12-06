import GameContainer from "../../components/game/game.component"
import Board from "../../components/board/board.component"
import Form from "../../components/form/form.component"
import Timer from "../../components/timer/timer.component"

export default function ComputerRoute() {
   return (
      <>
         <Form />
         <GameContainer>
            <Board />
            <Timer />
         </GameContainer>
      </>
   )
}