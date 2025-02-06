import { useContext, MouseEvent } from 'react';
import { MenuContext } from '../burger-menu/burger-menu.context';
import exitImg from '../../assets/left-arrow.svg';
import Overlay from '../overlay/overlay.component';
import VerticalNavigation from '../vertical-navigation/vertical-navigation.component';
import * as S from './sidebar.style';

export default function Sidebar() {
   const { isOpen, setIsOpen } = useContext(MenuContext);

   const exitMenu = (): void => {
      setIsOpen(false);
   }

   const handleClickOverlay = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>): void => {
      const target = e.target as HTMLElement;

      if (!target.classList.contains('overlay')) return; 

      exitMenu();
   }
   
   return (
      <Overlay isOpen={isOpen} clickHandler={ handleClickOverlay }>
         <S.Sidebar style={{ scale: isOpen ? '1 1' : '0 1'}}>
            <S.SideBarHeader>
               <h1>Chess</h1>
               <S.ExitButton onClick={ exitMenu }><S.ExitIcon src={exitImg} /></S.ExitButton>
            </S.SideBarHeader>
            <VerticalNavigation />
         </S.Sidebar>
      </Overlay>
   )
}