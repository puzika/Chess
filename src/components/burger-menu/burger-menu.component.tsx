import { MouseEvent } from 'react';
import * as S from './burger-menu.style';

export default function BurgerMenu() {
   const handleToggle = (e: MouseEvent<HTMLSpanElement>): void => {
      e.currentTarget.classList.toggle('open');
   }

   return <S.BurgerMenuIcon onClick={handleToggle} />
}