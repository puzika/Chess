import { useState, useMemo, DragEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectPlayer } from '../game/game.slice';
import { RANKS, FILES, selectPosition, selectTurn, move } from './board.slice';
import { getCellColor, getIdxFromCoords } from './board.utils';
import { generateBoardFromFen, getHighlightedCells, moveHighlight, captureHighlight } from './board.utils';
import { pieces } from '../../pieces/pieces.images';
import { getLegalMoves, getPieceColor } from '../../pieces/pieces.moves';
import type { Color, Piece } from './board.slice';
import type { Coords } from './board.slice';
import * as S from './board.style';
import * as svar from '../../variables.style';

export default function Board() {
   const dispatch = useAppDispatch(); 

   const player: Color = useAppSelector(selectPlayer);
   const turn: Color = useAppSelector(selectTurn);
   const position: string = useAppSelector(selectPosition);

   const ranks: string[] = player === 'w' ? [...RANKS].reverse() : RANKS;
   const files: string[] = player === 'w' ? FILES : [...FILES].reverse();
   const board: string[][] = useMemo(() => player === 'w' ? generateBoardFromFen(position) : generateBoardFromFen(position.split('').reverse().join('')), [turn, player]);
   const legalMoves: Map<number, Coords[]> = useMemo(() => getLegalMoves(board, turn, player), [turn]);
   const [origin, setOrigin] = useState<Coords>({ row: -1, col: -1 });

   const highlightedCells: Set<number> = getHighlightedCells(origin, legalMoves);

   const handleDragStart = (e: DragEvent<HTMLImageElement>): void => {
      const parentCell = e.currentTarget.parentElement as HTMLDivElement;

      const row: number = Number(parentCell.dataset.row);
      const col: number = Number(parentCell.dataset.col);

      setOrigin({ row, col });
   }

   const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
   }

   const handleDragDrop = (e: DragEvent<HTMLDivElement>): void => {
      const targetCell = e.currentTarget as HTMLDivElement;

      
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
                     onDragOver={handleDragOver}
                     onDrop={handleDragDrop}

                     style={{
                        boxShadow: highlightedCells.has(getIdxFromCoords({ row: idxRank, col: idxFile})) ?
                           !!board[idxRank][idxFile] ? captureHighlight : moveHighlight :
                           'none'
                     }}
                  >
                     { idxRank === ranks.length - 1 && <S.FileMark>{file}</S.FileMark> }
                     { idxFile === files.length - 1 && <S.RankMark>{rank}</S.RankMark> }
                     {
                        !!board[idxRank][idxFile] && 
                        <S.Piece 
                           draggable={player === turn && turn === getPieceColor(board[idxRank][idxFile] as Piece)} 
                           src={pieces[board[idxRank][idxFile]]}
                           onDragStart={handleDragStart}
                        /> 
                     }
                  </S.Cell>
               ))
            ))
         }
      </S.Board>
   )
}