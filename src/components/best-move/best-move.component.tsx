import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBestMove } from '../../utils/stockfish';
import { selectCurrPosition } from '../../routes/analysis-route/analysis-route.slice';
import { fetchBestMove } from '../../utils/stockfish';
import * as S from './best-move.style';

export default function BestMove() {
   const dispatch = useAppDispatch();
   const currPosition = useAppSelector(selectCurrPosition);
   const bestMove = useAppSelector(selectBestMove);

   const handleClick = async () => {
      try {
         await dispatch(fetchBestMove(currPosition)).unwrap();
      } catch(err) {
         alert(err);
      }
   }

   return (
      <S.BestMove onClick={handleClick}>Best move: {bestMove}</S.BestMove>
   )
}