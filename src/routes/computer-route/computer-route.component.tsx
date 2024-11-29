import GameContainer from "../../components/game/game.component"
import Board from "../../components/board/board.component"
import Form from "../../components/form/form.component"

export default function ComputerRoute() {
   return (
      <GameContainer>
         <Form />
         <Board />
      </GameContainer>
   )
}