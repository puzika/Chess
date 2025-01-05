import { useEffect, useState, useContext, useRef, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectPlayer, selectTime, selectDepth } from '../game/game.slice';
import ColorCard from '../color-card/color-card.component';
import Button from '../button/button.component';
import { selectTurn } from '../board/board.slice';
import { TimerContext } from './timer.context';
import type { TimerContextType } from './timer.context';
import type { Color } from '../board/board.slice';
import type { CardColor } from '../color-card/color-card.component';
import * as S from './timer.style';

function formatTime(milliseconds: number): string {
   const mins: string = `${new Date(milliseconds).getMinutes()}`.padStart(2, '0');
   const secs: string = `${new Date(milliseconds).getSeconds()}`.padStart(2, '0');

   return `${mins}:${secs}`;
}

function minutesToMilliseconds(minutes: number): number {
   return minutes * 60 * 1000;
}

export default function Timer() {
   const player: Color = useAppSelector(selectPlayer);
   const turn: Color = useAppSelector(selectTurn);
   const startTime: number = useAppSelector(selectTime);
   const depth: number = useAppSelector(selectDepth);
   const colorPlayer: CardColor = player === 'w' ? 'white' : 'black';
   const colorComputer: CardColor = player === 'w' ? 'black' : 'white';

   const countdownId = useRef<null | number>(null);
   const currTimePlayer = useRef<number>(minutesToMilliseconds(startTime));
   const currTimeComputer = useRef<number>(minutesToMilliseconds(startTime));
   const [formattedTimePlayer, setFormattedTimePlayer] = useState<string>(formatTime(startTime));
   const [formattedTimeComputer, setFormattedTimeComputer] = useState<string>(formatTime(startTime));
   const { setIsTimerOver } = useContext<TimerContextType>(TimerContext);

   const startTimer = (currTime: MutableRefObject<number>, setFormattedTime: Dispatch<SetStateAction<string>>): number => {
      const endTime: number = new Date().getTime() + currTime.current;

      const countdown = () => {
         currTime.current = endTime - new Date().getTime();
         
         if (currTime.current > 0) {
            setFormattedTime(formatTime(currTime.current));
            countdownId.current = requestAnimationFrame(countdown);
         } else {
            setIsTimerOver(true);
            cancelAnimationFrame(countdownId.current!);
         }
      }

      return requestAnimationFrame(countdown);
   }

   useEffect(() => {
      currTimePlayer.current = minutesToMilliseconds(startTime);
      currTimeComputer.current = minutesToMilliseconds(startTime);

      setFormattedTimePlayer(formatTime(currTimePlayer.current));
      setFormattedTimeComputer(formatTime(currTimeComputer.current));
   }, [startTime]);

   useEffect(() => {
      countdownId.current = player === turn ? 
         startTimer(currTimePlayer, setFormattedTimePlayer) : 
         startTimer(currTimeComputer, setFormattedTimeComputer);

      return () => cancelAnimationFrame(countdownId.current!);
   }, [turn, startTime]);

   return (
      <S.Container>
         <S.TimerContainer>
            <S.Timer $isTurn={turn !== player}>
               <ColorCard chosen={turn !== player} color={colorComputer} width={'40%'} />
               <S.TimerData>
                  <S.Time>{formattedTimeComputer}</S.Time>
                  <S.PlayerName>AI depth {depth}</S.PlayerName>
               </S.TimerData>
            </S.Timer>
            <S.Timer $isTurn={turn === player}>
               <ColorCard chosen={turn === player} color={colorPlayer} width={'40%'} />
               <S.TimerData>
                  <S.Time>{formattedTimePlayer}</S.Time>
                  <S.PlayerName>You</S.PlayerName>
               </S.TimerData>
            </S.Timer>
         </S.TimerContainer>
         <Button>Resign</Button>
      </S.Container>
   )
}