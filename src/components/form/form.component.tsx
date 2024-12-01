import { useState, MouseEvent, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import type { Color } from '../board/board.slice';
import type { CardColor } from '../color-card/color-card.component';
import type { Game } from '../game/game.slice';
import { startGame } from '../game/game.slice';
import ExitButton from '../exit-button/exit-button.component';
import Button from '../button/button.component';
import ColorCard from '../color-card/color-card.component';
import * as S from './form.style';

export default function Form() {
   const dispatch = useAppDispatch();
   const [formOpen, setFormOpen] = useState<boolean>(true);
   const [time, setTime] = useState<number>(10);
   const [depth, setDepth] = useState<number>(10);
   const [cardColor, setCardColor] = useState<CardColor>('random');

   const start = (): void => {
      let player: Color;

      if (cardColor === 'black') player = 'b';
      else if (cardColor === 'white') player = 'w';
      else player = Math.random() < .5 ? 'w' : 'b';

      const game: Game = {
         type: 'computer',
         time,
         depth,
         player,
      }

      dispatch(startGame(game));
   }

   const handleChangeTime = (e: ChangeEvent<HTMLInputElement>): void => {
      setTime(Number(e.currentTarget.value));
   }

   const handleChangeDepth = (e: ChangeEvent<HTMLInputElement>): void => {
      setDepth(Number(e.currentTarget.value));
   }

   const handleClickOverlay = (e: MouseEvent<HTMLDivElement>): void => {
      const target = e.target as HTMLElement;

      if (!target.classList.contains('overlay')) return;

      start();
      setFormOpen(false);
   }

   const handleClickClose = (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();

      start();
      setFormOpen(false);
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      start();
      setFormOpen(false);
   }

   return (
      <S.Overlay className='overlay' isOpen={formOpen} onClick={handleClickOverlay}>
         <S.Form onSubmit={handleSubmit}>
            <ExitButton closeHandler={handleClickClose} />
            <S.FormTitle>Play vs computer</S.FormTitle>
            <S.FormItem>
               <S.FormLabelMain>Time control</S.FormLabelMain>
               <S.FormInputRange type='range' min={1} max={60} value={time} onChange={handleChangeTime} />
               <S.FormLabelSecondary>Minutes per side: {time}</S.FormLabelSecondary>
            </S.FormItem>
            <S.FormItem>
               <S.FormLabelMain>Strength</S.FormLabelMain>
               <S.FormInputRange type='range' min={1} max={15} value={depth} onChange={handleChangeDepth} />
               <S.FormLabelSecondary>Stockfish depth: {depth}</S.FormLabelSecondary>
            </S.FormItem>
            <S.FormItem>
               <S.FormCards>
                  <ColorCard clickHandler={() => setCardColor('white')} chosen={cardColor === 'white'} width={8} color='white' />
                  <ColorCard clickHandler={() => setCardColor('random')} chosen={cardColor === 'random'} width={10} color='random' />
                  <ColorCard clickHandler={() => setCardColor('black')} chosen={cardColor === 'black'} width={8} color='black' />
               </S.FormCards>
               <S.FormLabelSecondary>Your color: {cardColor}</S.FormLabelSecondary>
            </S.FormItem>
            <Button>Start game</Button>
         </S.Form>
      </S.Overlay>
   )
}