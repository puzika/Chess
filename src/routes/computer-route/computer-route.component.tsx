import { useRef } from "react"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { selectOutcomeMessage, selectGameState, selectPlayer, selectDepth, setGameType, setGameState } from "../../components/game/game.slice"
import { selectTurn } from "../../components/board/board.slice"
import { selectCurrPosition, selectCurrPositionIdx } from "../analysis-route/analysis-route.slice"
import { fetchEngineMove, removeEngineMove } from "../../utils/stockfish"
import type { GameState } from "../../components/game/game.slice"
import type { Color } from "../../components/board/board.slice"
import GameContainer from "../../components/game/game.component"
import Board from "../../components/board/board.component"
import Form from "../../components/form/form.component"
import Timer from "../../components/timer/timer.component"
import TimerProvider from "../../components/timer/timer.context"
import Popup from "../../components/popup/popup.component"
import { useEffect } from "react"

export default function ComputerRoute() {
   const dispatch = useAppDispatch();
   const outcomeMessage: string = useAppSelector(selectOutcomeMessage);
   const gameState: GameState = useAppSelector(selectGameState);
   const currPositionIdx: number = useAppSelector(selectCurrPositionIdx);
   const turn: Color = useAppSelector(selectTurn);
   const player: Color = useAppSelector(selectPlayer);
   const fen: string = useAppSelector(selectCurrPosition);
   const depth: number = useAppSelector(selectDepth);
   const abortSignal = useRef<AbortController | null>(null);

   const requestEngineMove = async () => {
      if (gameState === 'FINISHED') return;

      if (!!abortSignal.current) {
         abortSignal.current.abort();
         abortSignal.current = null;
      }

      abortSignal.current = new AbortController();
      
      try {
         await dispatch(fetchEngineMove({ fen, depth, signal: abortSignal.current.signal })).unwrap();
      } catch(err) {
         if (err === 'Aborted') console.log('Request aborted');
         else alert(err);
      }
   }

   useEffect(() => {
      dispatch(setGameType('computer'));
      currPositionIdx === 0 && dispatch(setGameState('YET_TO_BEGIN'));
   }, []);

   useEffect(() => {
      if (turn !== player) requestEngineMove();
      else dispatch(removeEngineMove());
   }, [fen, player]);

   return (
      <>
         { gameState === 'YET_TO_BEGIN' && <Form /> }
         { outcomeMessage !== '' && <Popup message={outcomeMessage} /> }
         <GameContainer>
            <TimerProvider>
               <Board />
               <Timer />
            </TimerProvider>
         </GameContainer>
      </>
   )
}