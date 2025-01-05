import { useState } from 'react';
import Overlay from '../overlay/overlay.component';
import ExitButton from '../exit-button/exit-button.component';
import Button from '../button/button.component';
import * as S from './popup.style';

type PopupProps = {
   message: string,
}

export default function Popup({ message }: PopupProps) {
   const [isOpen, setIsOpen] = useState<boolean>(true);

   const close = () => {
      setIsOpen(false);
   }

   return (
      <Overlay isOpen={isOpen} clickHandler={close}>
         <S.Popup>
            <ExitButton closeHandler={close} />
            <S.PopupMessage>{message}</S.PopupMessage>
            <S.Buttons>
               <Button>Play again</Button>
               <Button>Analyze</Button>
            </S.Buttons>
         </S.Popup>
      </Overlay>
   )
}