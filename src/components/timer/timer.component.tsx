import { useAppSelector } from '../../store/hooks';
import { selectPlayer, selectTime, selectDepth } from '../game/game.slice';
import ColorCard from '../color-card/color-card.component';
import { selectTurn } from '../board/board.slice';
import type { Color } from '../board/board.slice';
import type { CardColor } from '../color-card/color-card.component';
import * as S from './timer.style';

function formatTime(time: number): string {
   const mins: string = `${time / 60}`.padStart(2, '0');
   const secs: string = `${time % 60}`.padStart(2, '0');

   return `${mins}:${secs}`;
}

export default function Timer() {
   const player: Color = useAppSelector(selectPlayer);
   const turn: Color = useAppSelector(selectTurn);
   const startTime: number = useAppSelector(selectTime);
   const depth: number = useAppSelector(selectDepth);

   const time: string = formatTime(startTime * 60);
   const colorPlayer: CardColor = player === 'w' ? 'white' : 'black';
   const colorComputer: CardColor = player === 'w' ? 'black' : 'white';

   return (
      <S.TimerContainer>
         <S.Timer $isTurn={turn !== player}>
            <ColorCard chosen={turn !== player} color={colorComputer} width={'40%'} />
            <S.TimerData>
               <S.Time>{time}</S.Time>
               <S.PlayerName>AI depth {depth}</S.PlayerName>
            </S.TimerData>
         </S.Timer>
         <S.Timer $isTurn={turn === player}>
            <ColorCard chosen={turn === player} color={colorPlayer} width={'40%'} />
            <S.TimerData>
               <S.Time>{time}</S.Time>
               <S.PlayerName>You</S.PlayerName>
            </S.TimerData>
         </S.Timer>
      </S.TimerContainer>
   )
}