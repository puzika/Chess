import { useContext } from 'react';
import { MenuContext } from './burger-menu.context';
import * as S from './burger-menu.style';

export default function BurgerMenu() {
   const { isOpen, setIsOpen } = useContext(MenuContext);

   const handleClick = () => {
      setIsOpen(!isOpen);
   }

   return (
      <S.BurgerMenuContainer onClick={handleClick}>
         <S.BurgerMenuIcon />
      </S.BurgerMenuContainer>
   )
}