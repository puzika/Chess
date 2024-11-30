import { MouseEvent } from 'react';
import * as S from './exit-button.style';

type ExitButtonProps = {
   closeHandler: (e: MouseEvent<HTMLButtonElement>) => void,
}

export default function ExitButton({ closeHandler }: ExitButtonProps) {
   return <S.ExitButton onClick={closeHandler} />
}