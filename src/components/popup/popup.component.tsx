import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { setGameState } from '../game/game.slice';
import { initialize } from '../board/board.slice';
import Overlay from '../overlay/overlay.component';
import ExitButton from '../exit-button/exit-button.component';
import Button from '../button/button.component';
import * as S from './popup.style';

type PopupProps = {
   message: string,
}

export default function Popup({ message }: PopupProps) {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [isOpen, setIsOpen] = useState<boolean>(true);

   const restart = () => {
      dispatch(setGameState('YET_TO_BEGIN'));
      dispatch(initialize());
      setIsOpen(false);
   }

   const navigateToAnalysis = () => {
      navigate('/analysis');
   }

   return (
      <Overlay isOpen={isOpen} clickHandler={close}>
         <S.Popup>
            <ExitButton closeHandler={restart} />
            <S.PopupMessage>{message}</S.PopupMessage>
            <S.Buttons>
               <Button clickHandler={restart}>Play again</Button>
               <Button clickHandler={navigateToAnalysis}>Analyze</Button>
            </S.Buttons>
         </S.Popup>
      </Overlay>
   )
}