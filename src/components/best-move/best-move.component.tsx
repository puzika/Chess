import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrPosition, selectBestMove, selectError, selectLoading } from '../../routes/analysis-route/analysis-route.slice';
import { fetchBestMove } from '../../routes/analysis-route/analysis-route.slice';
import * as S from './best-move.style';

export default function BestMove() {
   const dispatch = useAppDispatch();
   const currPosition = useAppSelector(selectCurrPosition);
   const loading = useAppSelector(selectLoading);
   const error = useAppSelector(selectError);
   const bestMove = useAppSelector(selectBestMove);

   const handleClick = async () => {
      try {
         const response = await dispatch(fetchBestMove(currPosition)).unwrap();
      } catch(err) {
         console.log(err);
      }
   }

   return (
      <S.BestMove onClick={handleClick}>Best move: {bestMove}</S.BestMove>
   )
}