import MovesBar from '../moves-bar/moves-bar.component';
import BestMove from '../best-move/best-move.component';
import Jumps from '../jumps/jumps.component';
import * as S from './analysis-tools.style';

export default function AnalysisTools() {
   return (
      <S.AnalysisSidebar>
         <MovesBar />
         <Jumps />
         <BestMove />
      </S.AnalysisSidebar>
   )
}