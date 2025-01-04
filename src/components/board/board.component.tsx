import { useState, useEffect, useMemo, useContext, DragEvent, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectPlayer, selectOutcomeMessage, setOutcomeMessage } from '../game/game.slice';
import { RANKS, FILES, selectPosition, selectTurn, selectCastling, selectEnpassant, movePlayer, promote } from './board.slice';
import { getCellColor, getIdxFromCoords } from './board.utils';
import { generateBoardFromFen, getLegalMovesForPiece, moveHighlight, captureHighlight, checkHighLight, isPromotion, hasLegalMoves } from './board.utils';
import { pieces } from '../../pieces/pieces.images';
import { getLegalMoves, getPieceColor, isChecked } from '../../pieces/pieces.moves';
import { TimerContext } from '../timer/timer.context';
import type { GameState } from '../../pieces/pieces.moves';
import type { Color, Piece, Move } from './board.slice';
import type { Coords } from './board.slice';
import type { GameData } from '../game/game.utils';
import type { TimerContextType } from '../timer/timer.context';
import Promotion from '../promotion/promotion.component';
import * as S from './board.style';
import * as svar from '../../variables.style';

export default function Board() {
   const dispatch = useAppDispatch();
   const { isTimeOver } = useContext<TimerContextType>(TimerContext);

   const player: Color = useAppSelector(selectPlayer);
   const turn: Color = useAppSelector(selectTurn);
   const position: string = useAppSelector(selectPosition);
   const castling: string = useAppSelector(selectCastling);
   const enpassant: string = useAppSelector(selectEnpassant);
   const outcomeMessage: string = useAppSelector(selectOutcomeMessage);

   console.log(outcomeMessage);

   const ranks: string[] = player === 'w' ? [...RANKS].reverse() : RANKS;
   const files: string[] = player === 'w' ? FILES : [...FILES].reverse();
   const board: string[][] = useMemo(() => player === 'w' ? generateBoardFromFen(position) : generateBoardFromFen(position.split('').reverse().join('')), [position, turn, player]);
   const [checked, setChecked] = useState<boolean>(false);
   const [promotionCell, setPromotionCell] = useState<Coords>({ row: -1, col: -1 });
   const [origin, setOrigin] = useState<Coords>({ row: -1, col: -1 });
   const [draggedOver, setDraggedOver] = useState<Coords>({row: -1, col: -1});

   const currGameState: GameState = { board, turn, player, castling, enpassant };
   const allLegalMoves: Map<number, Coords[]> = useMemo(() => getLegalMoves(currGameState), [turn, player, position]);
   const currLegalMoves: Set<number> = getLegalMovesForPiece(origin, allLegalMoves);

   useEffect(() => {
      if (isTimeOver) {
         const gameData: GameData = {
            isTimeOver,
            isChecked: checked,
            board,
            hasLegalMoves: hasLegalMoves(allLegalMoves),
            turn,
         };

         dispatch(setOutcomeMessage(gameData));
      }
   }, [isTimeOver]);

   useEffect(() => {
      const check = isChecked(currGameState);
      const gameData: GameData = {
         isTimeOver,
         isChecked: check,
         board,
         hasLegalMoves: hasLegalMoves(allLegalMoves),
         turn,
      };

      setChecked(check);
      dispatch(setOutcomeMessage(gameData));
   }, [position, turn, player]);

   const handleDragStart = (e: DragEvent<HTMLImageElement>): void => {
      const parentCell = e.currentTarget.parentElement as HTMLDivElement;

      const row: number = Number(parentCell.dataset.row);
      const col: number = Number(parentCell.dataset.col);

      setOrigin({ row, col });
   }

   const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
   }

   const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
      const cell = e.currentTarget as HTMLDivElement;

      const row: number = Number(cell.dataset.row);
      const col: number = Number(cell.dataset.col);

      if (currLegalMoves.has(getIdxFromCoords({ row, col }))) setDraggedOver({ row, col });
      else if (draggedOver.row !== -1 && draggedOver.col !== -1) setDraggedOver({ row: -1, col: -1 });
   }

   const handleDragDrop = (e: DragEvent<HTMLDivElement>): void => {
      const targetCell = e.currentTarget as HTMLDivElement;

      const row: number = Number(targetCell.dataset.row);
      const col: number = Number(targetCell.dataset.col);

      setDraggedOver({ row: -1, col: -1 });

      if (!currLegalMoves.has(getIdxFromCoords({ row, col }))) return;

      const target: Coords = { row, col };
      const moveCoords: Move = { origin, target };
      const piece: string = board[origin.row][origin.col];

      dispatch(movePlayer({board, moveCoords, player}));
      setOrigin({ row: -1, col: -1 });

      isPromotion(target, piece) && setPromotionCell(target);
   }

   const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
      const targetCell = e.currentTarget as HTMLDivElement;

      const row: number = Number(targetCell.dataset.row);
      const col: number = Number(targetCell.dataset.col);

      const isValidOriginCell: boolean = allLegalMoves.has(getIdxFromCoords({ row, col }));

      if (isValidOriginCell) setOrigin({ row, col });
      else if (currLegalMoves.has(getIdxFromCoords({ row, col }))) {
         const target: Coords = { row, col };
         const moveCoords: Move = { origin, target };
         const piece: string = board[origin.row][origin.col];

         dispatch(movePlayer({board, moveCoords, player}));
         setOrigin({ row: -1, col: -1 });
         setDraggedOver({ row: -1, col: -1 });

         isPromotion(target, piece) && setPromotionCell(target);
      }
   }

   const handleMouseOver = (e: MouseEvent<HTMLDivElement>): void => {
      const cell = e.currentTarget as HTMLDivElement;

      const row: number = Number(cell.dataset.row);
      const col: number = Number(cell.dataset.col);

      if (currLegalMoves.has(getIdxFromCoords({ row, col }))) setDraggedOver({ row, col });
      else if (draggedOver.row !== -1 && draggedOver.col !== -1) setDraggedOver({ row: -1, col: -1 });
   }

   const handlePromotion = (promotion: string): void => {
      dispatch(promote({ promotion, promotionCell, board, player}));
      setPromotionCell({ row: -1, col: -1 });
   }

   return (
      <S.Board>
         {
            ranks.map((rank, idxRank) => (
               files.map((file, idxFile) => (
                  <S.Cell 
                     key={file + rank}
                     data-row={`${idxRank}`}
                     data-col={`${idxFile}`}
                     $backgroundColor={getCellColor(idxRank, idxFile) === 'w' ? svar.clrCellWhite : svar.clrCellBlack} 
                     $color={getCellColor(idxRank, idxFile) === 'w' ? svar.clrCellBlack : svar.clrCellWhite}
                     onDragEnter={handleDragEnter}
                     onDragOver={handleDragOver}
                     onDrop={handleDragDrop}
                     onClick={handleClick}
                     onMouseOver={handleMouseOver}

                     style={{
                        boxShadow: currLegalMoves.has(getIdxFromCoords({ row: idxRank, col: idxFile})) ?
                           !!board[idxRank][idxFile] ? captureHighlight : moveHighlight :
                           checked && board[idxRank][idxFile].toLowerCase() === 'k' && getPieceColor(board[idxRank][idxFile] as Piece) === turn ? checkHighLight : 'none',
                        backgroundImage: currLegalMoves.has(getIdxFromCoords({ row: idxRank, col: idxFile})) && 
                           idxRank === draggedOver.row && idxFile === draggedOver.col ?
                           `linear-gradient(90deg, ${svar.clrHighlightTransparent} 0% 50%, ${svar.clrHighlightTransparent} 50% 100%)` :
                           'none',
                     }}
                  >
                     { idxRank === ranks.length - 1 && <S.FileMark>{file}</S.FileMark> }
                     { idxFile === files.length - 1 && <S.RankMark>{rank}</S.RankMark> }
                     {
                        !!board[idxRank][idxFile] && 
                        <S.Piece 
                           draggable={turn === getPieceColor(board[idxRank][idxFile] as Piece)} 
                           src={pieces[board[idxRank][idxFile]]}
                           onDragStart={handleDragStart}
                        /> 
                     }
                  </S.Cell>
               ))
            ))
         }
         { 
            (promotionCell.row !== -1 && promotionCell.col !== -1) && <Promotion promotionHandler={handlePromotion} />
         }
      </S.Board>
   )
}