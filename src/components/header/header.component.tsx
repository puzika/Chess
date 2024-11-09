import * as S from './header.style';
import Navigation from '../navigation/navigation.component';

export default function Header() {
   return (
      <S.HeaderWrapper>
         <S.Header>
            <S.HeaderTitle>Chess</S.HeaderTitle>
            <Navigation />
         </S.Header>
      </S.HeaderWrapper>
   )
}