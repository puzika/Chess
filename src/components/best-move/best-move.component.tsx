import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectEngineMove } from '../../utils/stockfish';
import { selectCurrPosition } from '../../routes/analysis-route/analysis-route.slice';
import { fetchEngineMove } from '../../utils/stockfish';
import { selectLoading } from '../../utils/stockfish';
import { selectGameState } from '../game/game.slice';
import { MAX_DEPTH } from '../../utils/stockfish';
import Loading from '../loading/loading.component';
import type { GameState } from '../game/game.slice';
import type { RequestState } from '../../utils/stockfish';
import * as S from './best-move.style';

export default function BestMove() {
   const dispatch = useAppDispatch();
   const gameState: GameState = useAppSelector(selectGameState);
   const currPosition: string = useAppSelector(selectCurrPosition);
   const bestMove: string = useAppSelector(selectEngineMove);
   const requestState: RequestState = useAppSelector(selectLoading);
   const abortSignal = useRef<AbortController | null>(null);

   const handleClick = async () => {
      if (gameState === 'FINISHED') return;

      if (!!abortSignal.current) {
         abortSignal.current.abort();
         abortSignal.current = null;
      }

      abortSignal.current = new AbortController();

      try {
         await dispatch(fetchEngineMove({ fen: currPosition, depth: MAX_DEPTH, signal: abortSignal.current.signal })).unwrap();
      } catch(err) {
         if (err === 'Aborted') console.log('Request aborted');
         else alert(err);
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