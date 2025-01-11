import { useAppDispatch } from '../../store/hooks';
import { jumpBack, jumpForward } from '../../routes/analysis-route/analysis-route.slice';
import Rewind from '../../assets/rewind.svg';
import FastForward from '../../assets/fast-forward.svg';
import * as S from './jumps.style';

export default function Jumps() {
   const dispatch = useAppDispatch();

   return (
      <S.Jumps>
         <S.Jump onClick={() => dispatch(jumpBack())}><S.JumpImg src={Rewind} /></S.Jump>
         <S.Jump onClick={() => dispatch(jumpForward())}><S.JumpImg src={FastForward} /></S.Jump>
      </S.Jumps>
   )
}