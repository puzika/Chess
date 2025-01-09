import * as S from './jumps.style';
import Rewind from '../../assets/rewind.svg';
import FastForward from '../../assets/fast-forward.svg';

export default function Jumps() {
   return (
      <S.Jumps>
         <S.Jump><S.JumpImg src={Rewind} /></S.Jump>
         <S.Jump><S.JumpImg src={FastForward} /></S.Jump>
      </S.Jumps>
   )
}