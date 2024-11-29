import { useState, MouseEvent, ChangeEvent } from 'react';
import Button from '../button/button.component';
import * as S from './form.style';

export default function Form() {
   const [formOpen, setFormOpen] = useState<boolean>(true);
   const [time, setTime] = useState<number>(10);
   const [depth, setDepth] = useState<number>(10);

   const closeForm = (e: MouseEvent<HTMLDivElement>): void => {
      const target = e.target as HTMLElement;

      if (!target.classList.contains('overlay')) return;

      setFormOpen(false);
   };

   const handleChangeTime = (e: ChangeEvent<HTMLInputElement>): void => {
      setTime(Number(e.currentTarget.value));
   }

   const handleChangeDepth = (e: ChangeEvent<HTMLInputElement>): void => {
      setDepth(Number(e.currentTarget.value));
   }

   return (
      <S.Overlay className='overlay' isOpen={formOpen} onClick={closeForm}>
         <S.Form>
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
            <Button>Start game</Button>
         </S.Form>
      </S.Overlay>
   )
}