import { ReactNode } from 'react';
import * as S from './game.style';

type GameContainerProps = {
   children?: ReactNode | ReactNode[],
}

export default function GameContainer({ children }: GameContainerProps) {
   return (
      <S.Container>{ children }</S.Container>
   )
}