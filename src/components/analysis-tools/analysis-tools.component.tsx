import { useContext } from 'react';
import { ScreenSizeContext } from '../../screen-size.context';
import { device } from '../../breakpoints';
import MovesBar from '../moves-bar/moves-bar.component';
import BestMove from '../best-move/best-move.component';
import Jumps from '../jumps/jumps.component';
import * as S from './analysis-tools.style';

export default function AnalysisTools() {
   const { screenSize } = useContext(ScreenSizeContext);

   return (
      <S.AnalysisSidebar>
         { screenSize > device.tbmin && (<MovesBar />) }
         <Jumps />
         <BestMove />
         { screenSize <= device.tbmin && (<MovesBar />) }
      </S.AnalysisSidebar>
   )
}