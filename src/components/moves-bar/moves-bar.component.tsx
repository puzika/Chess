import Move from '../move/move.component';
import * as S from './moves-bar.style';

export default function MovesBar() {
   return (
      <S.MovesBarContainer>
         <S.MovesBar>
            <Move turn='w' />
            <Move turn='b' />
            <Move turn='w' />
            <Move turn='b' />
            <Move turn='w' />
            <Move turn='b' />
            <Move turn='w' />
            <Move turn='b' />
            <Move turn='w' />
            <Move turn='b' />
            <Move turn='w' />
            <Move turn='b' />
         </S.MovesBar>
      </S.MovesBarContainer>
   )
}