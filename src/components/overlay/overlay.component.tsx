import { ReactNode, MouseEvent } from 'react';
import * as S from './overlay.style';

type OverlayProps = {
   children?: ReactNode,
   clickHandler?: ((e: MouseEvent<HTMLDivElement>) => void) | (() => void),
   isOpen: boolean, 
}

export default function Overlay({ children, isOpen, clickHandler }: OverlayProps) {
   if (!clickHandler) return <S.Overlay className='overlay' $isOpen={isOpen}>{children}</S.Overlay>

   return <S.Overlay className='overlay' $isOpen={isOpen} onClick={clickHandler}>{children}</S.Overlay>
}