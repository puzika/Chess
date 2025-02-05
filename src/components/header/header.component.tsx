import { useContext } from 'react';
import { ScreenSizeContext } from '../../screen-size.context';
import { device } from '../../breakpoints';
import Navigation from '../navigation/navigation.component';
import BurgerMenu from '../burger-menu/burger-menu.component';
import * as S from './header.style';

export default function Header() {
   const { screenSize } = useContext(ScreenSizeContext);

   return (
      <S.HeaderWrapper>
         <S.Header>
            { screenSize <= device.mb && (<BurgerMenu />) }
            <S.HeaderTitle>Chess</S.HeaderTitle>
            { screenSize > device.mb && (<Navigation />)}
         </S.Header>
      </S.HeaderWrapper>
   )
}