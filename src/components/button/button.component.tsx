import { ReactNode } from 'react';
import * as S from './button.style';

type ButtonProps = {
   children: ReactNode | ReactNode[],  
}

export default function Button({ children }: ButtonProps) {
   return <S.Button>{children}</S.Button>
}