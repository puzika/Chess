import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBestMove } from '../../utils/stockfish';
import { selectCurrPosition } from '../../routes/analysis-route/analysis-route.slice';
import { fetchBestMove } from '../../utils/stockfish';
import { selectLoading } from '../../utils/stockfish';
import { selectGameState } from '../game/game.slice';
import Loading from '../loading/loading.component';
import type { GameState } from '../game/game.slice';
import type { RequestState } from '../../utils/stockfish';
import * as S from './best-move.style';

export default function BestMove() {
   const dispatch = useAppDispatch();
   const gameState: GameState = useAppSelector(selectGameState);
   const currPosition: string = useAppSelector(selectCurrPosition);
   const bestMove: string = useAppSelector(selectBestMove);
   const requestState: RequestState = useAppSelector(selectLoading);

   const handleClick = async () => {
      if (gameState === 'FINISHED') return;

      try {
         await dispatch(fetchBestMove(currPosition)).unwrap();
      } catch(err) {
         alert(err);
      }
   }

   return (
      <S.BestMove onClick={handleClick}>
         {
            requestState === 'pending' ? (
               <Loading />
            ) : (
               <>Best move: {bestMove}</>
            )
         }
      </S.BestMove>
   )
}