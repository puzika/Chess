import { useContext } from 'react';
import { MenuContext } from '../burger-menu/burger-menu.context';
import * as S from './vertical-navigation.style';

export default function VerticalNavigation() {
   const { setIsOpen } = useContext(MenuContext);

   const handleClick = (): void => setIsOpen(false); 

   return (
      <S.VerticalNavigation>
         <S.VerticalNavigationItem onClick={handleClick}>
            <S.VerticalNavigationLink to={'/'}>Home</S.VerticalNavigationLink>
         </S.VerticalNavigationItem>
         <S.VerticalNavigationItem onClick={handleClick}>
            <S.VerticalNavigationLink to={'/computer'}>Play vs Computer</S.VerticalNavigationLink>
         </S.VerticalNavigationItem>
         <S.VerticalNavigationItem onClick={handleClick}>
            <S.VerticalNavigationLink to={'/analysis'}>Analysis</S.VerticalNavigationLink>
         </S.VerticalNavigationItem>
      </S.VerticalNavigation>
   )
}