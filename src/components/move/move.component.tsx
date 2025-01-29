import { useAppDispatch } from '../../store/hooks';
import { jumpToIdx } from '../../routes/analysis-route/analysis-route.slice';
import type { Color } from '../board/board.slice';
import * as svar from '../../variables.style';
import * as S from './move.style';

type MoveProps = {
   turn: Color,
   move: string,
   current?: boolean,
   idx: number,
}

export default function Move({ turn, move, current, idx }: MoveProps) {
   const dispatch = useAppDispatch();

   return (
      <S.Move 
         style={{
            boxShadow: current ? `inset 0 0 1.5rem .5rem ${svar.clrHighlight}` : 'none',
         }} 
         $turn={turn}
         onClick={() => dispatch(jumpToIdx(idx))}
      >
         <p>{move}</p>
      </S.Move>
   )
}