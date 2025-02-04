import Navigation from '../navigation/navigation.component';
import BurgerMenu from '../burger-menu/burger-menu.component';
import * as S from './header.style';

export default function Header() {
   return (
      <S.HeaderWrapper>
         <S.Header>
            <BurgerMenu />
            <S.HeaderTitle>Chess</S.HeaderTitle>
            <Navigation />
         </S.Header>
      </S.HeaderWrapper>
   )
}