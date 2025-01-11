import type { Color } from '../board/board.slice';
import * as svar from '../../variables.style';
import * as S from './move.style';

type MoveProps = {
   turn: Color,
   move: string,
   current?: boolean,
}

export default function Move({ turn, move, current }: MoveProps) {
   return (
      <S.Move 
         style={{
            boxShadow: current ? `inset 0 0 1.5rem .5rem ${svar.clrHighlight}` : 'none',
         }} 
         turn={turn}
      >
         <p>{move}</p>
      </S.Move>
   )
}