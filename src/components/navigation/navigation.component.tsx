import * as S from './navigation.style';

export default function Navigation() {
   return (
      <S.Navigation>
         <li>
            <S.NavigationLink to={'/'}>Home</S.NavigationLink>
         </li>
         <li>
            <S.NavigationLink to={'/computer'}>Play vs Computer</S.NavigationLink>
         </li>
         <li>
            <S.NavigationLink to={'/analysis'}>Analysis</S.NavigationLink>
         </li>
      </S.Navigation>
   )
}