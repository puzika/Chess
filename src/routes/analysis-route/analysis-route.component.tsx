import GameContainer from "../../components/game/game.component";
import Board from "../../components/board/board.component";
import AnalysisTools from "../../components/analysis-tools/analysis-tools.component";

export default function AnalysisRoute() {
   return (
      <GameContainer>
         <Board />
         <AnalysisTools />
      </GameContainer>
   )
}