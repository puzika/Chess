import type { Color } from '../board/board.slice';
import * as S from './move.style';

export type MoveProps = {
   turn: Color,
}

export default function Move({ turn }: MoveProps) {
   return (
      <S.Move turn={turn}>
         <p>d1h5</p>
      </S.Move>
   )
}