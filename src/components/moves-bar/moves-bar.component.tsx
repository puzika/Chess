import { useAppSelector } from '../../store/hooks';
import { selectBoardPositions, selectCurrPositionIdx } from '../../routes/analysis-route/analysis-route.slice';
import Move from '../move/move.component';
import type { MovePosition } from '../../routes/analysis-route/analysis-route.slice';
import type { Color } from '../board/board.slice';
import * as S from './moves-bar.style';

export default function MovesBar() {
   const boardPositions: MovePosition[] = useAppSelector(selectBoardPositions);
   const currIdx: number = useAppSelector(selectCurrPositionIdx);
   
   const getMoveTurnFromPosition = (position: string): Color => {
      return position.split(' ')[1] as Color === 'w' ? 'b' : 'w';
   }

   return (
      <S.MovesBarContainer>
         <S.MovesBar>
            {
               boardPositions.map(({ notation, position }, idx) => (
                  <Move key={crypto.randomUUID()} move={notation} idx={idx} current={idx === currIdx} turn={getMoveTurnFromPosition(position)} />
               ))
            }
         </S.MovesBar>
      </S.MovesBarContainer>
   )
}