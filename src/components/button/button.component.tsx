import { ReactNode, MouseEvent } from 'react';
import * as S from './button.style';

type ButtonProps = {
   children: ReactNode,
   clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void,
}

export default function Button({ children, clickHandler }: ButtonProps) {
   if (!clickHandler) return <S.Button>{children}</S.Button>;

   return <S.Button onClick={clickHandler}>{children}</S.Button>;
}