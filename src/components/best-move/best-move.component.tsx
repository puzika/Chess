import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBestMove } from '../../utils/stockfish';
import { selectCurrPosition } from '../../routes/analysis-route/analysis-route.slice';
import { fetchBestMove } from '../../utils/stockfish';
import type { Response } from '../../utils/stockfish';
import * as S from './best-move.style';

export default function BestMove() {
   const dispatch = useAppDispatch();
   const currPosition: string = useAppSelector(selectCurrPosition);
   const bestMove: string = useAppSelector(selectBestMove);

   const handleClick = async () => {
      try {
         const response: Response = await dispatch(fetchBestMove(currPosition)).unwrap();
         console.log(response);
      } catch(err) {
         alert(err);
      }
   }

   return (
      <S.BestMove onClick={handleClick}>Best move: {bestMove}</S.BestMove>
   )
}