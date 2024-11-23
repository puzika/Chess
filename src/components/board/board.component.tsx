import { DragEvent, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectPosition, selectTurn, move } from './board.slice';
import type { Color, Coords, Piece } from './board.slice';
import { pieces } from '../../pieces/pieces.images';
import { getLegalMoves } from '../../pieces/pieces.moves';
import * as S from './board.style';
import * as svar from '../../variables.style';

const RANKS: number = 8;
const FILES: number = 8;

const files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const isCellBlack = (rankIdx: number, fileIdx: number): boolean => {
   return (rankIdx % 2 === 0 && fileIdx % 2 !== 0) || (rankIdx % 2 !== 0 && fileIdx % 2 === 0);
}

const generatePosition = (positionString: string): string[][] => {
   const position: string[] = positionString.split('/');
   const board: string[][] = [];

   for (const positionRank of position) {
      const boardRank: string[] = [];

      for (const char of positionRank) {
         const numberOfEmptyCells = Number(char);

         if (isFinite(numberOfEmptyCells)) {
            const emptyCells: string[] = new Array(numberOfEmptyCells).fill('');
            boardRank.push(...emptyCells);
         } else {
            boardRank.push(char);
         }
      }

      board.push(boardRank);
   }

   return board;
}

const draggable = (piece: Piece, turn: Color): boolean => {
      const color: Color = piece.toLowerCase() === piece ? 'b' : 'w';

      return color === turn;
}

const resetCoords = (...coords: Coords[]): void => {
   coords.forEach(c => {
      c.row = -1;
      c.col = -1;
   })
}

const addHighlight = (elem: HTMLDivElement): void => {
   if (!!elem.querySelector('.piece')) elem.style.boxShadow = `inset 0 0 2rem ${svar.clrNeutralMax}`;
   else elem.style.boxShadow = `inset 0 0 2rem ${svar.clrHighlight}`;
}

const removeHighlight = (elem: HTMLDivElement): void => {
   elem.style.boxShadow = 'none';
}

const addHover = (elem: HTMLDivElement): void => {
   elem.style.backgroundImage = `linear-gradient(135deg, ${svar.clrHighlightTransparent} 0 50%, ${svar.clrHighlightTransparent} 50% 100%)`;
}

const removeHover = (elem: HTMLDivElement): void => {
   elem.style.backgroundImage = 'none';
}

const highlightMoves = (cell: Coords, legalMoves: Map<number, Coords[]>): void => {
   const idx: number = cell.row * RANKS + cell.col;
   const moves: Coords[] = legalMoves.get(idx) ?? [];

   moves.forEach(c => {
      const elem = document.querySelector(`[data-col="${c.col}"][data-row="${c.row}"]`) as HTMLDivElement;
      addHighlight(elem);
   });
}

const hideMoves = (cell: Coords, legalMoves: Map<number, Coords[]>): void => {
   const idx: number = cell.row * RANKS + cell.col;
   const moves: Coords[] = legalMoves.get(idx) ?? [];

   moves.forEach(c => {
      const elem = document.querySelector(`[data-col="${c.col}"][data-row="${c.row}"]`) as HTMLDivElement;
      removeHighlight(elem);
   });
}

const canDrop = (target: Coords, moves: Coords[]): boolean => {
   for (const coord of moves) {
      if (coord.row === target.row && coord.col === target.col) return true;
   }

   resetCoords(target);

   return false;
}

export default function Board() {
   const dispatch = useAppDispatch();
   const position: string = useAppSelector(selectPosition);
   const turn = useAppSelector(selectTurn);
   const board: string[][] = generatePosition(position);
   const legalMoves: Map<number, Coords[]> = getLegalMoves(board, turn);
   
   const originCoords: Coords = { row: -1, col: -1 };
   const targetCoords: Coords = { row: -1, col: -1 };

   const handleDragStart = (e: DragEvent<HTMLImageElement>): void => {
      const cell = e.currentTarget.parentElement as HTMLDivElement;

      if (originCoords.row !== -1 && originCoords.col !== -1) hideMoves(originCoords, legalMoves);
      
      originCoords.row = Number(cell.dataset.row);
      originCoords.col = Number(cell.dataset.col);

      highlightMoves(originCoords, legalMoves);
   }

   const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
   } 

   const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
      if (!e.currentTarget.classList.contains('cell')) return;

      const cell = e.currentTarget as HTMLDivElement;

      targetCoords.row = Number(cell.dataset.row);
      targetCoords.col = Number(cell.dataset.col);

      const moves: Coords[] = legalMoves.get(originCoords.row * RANKS + originCoords.col) ?? [];

      if (!canDrop(targetCoords, moves)) return;

      hideMoves(originCoords, legalMoves);
      removeHover(cell);
      dispatch(move(originCoords, targetCoords, board));
      resetCoords(originCoords, targetCoords);
   }

   const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
      const cell = e.currentTarget.closest('.cell') as HTMLDivElement;

      const row: number = Number(cell.dataset.row);
      const col: number = Number(cell.dataset.col);

      const moves: Coords[] = legalMoves.get(originCoords.row * RANKS + originCoords.col) ?? [];

      if (moves.length === 0 || !canDrop({ row, col }, moves)) return;
      
      addHover(cell);
   }

   const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
      const cell = e.currentTarget as HTMLDivElement;

      if (cell.contains(e.relatedTarget as Node | null)) return;

      removeHover(cell);
   }

   const handleClickPiece = (e: MouseEvent<HTMLImageElement>): void => {
      const cell = e.currentTarget.parentElement as HTMLDivElement;
      const row: number = Number(cell.dataset.row);
      const col: number = Number(cell.dataset.col);

      const color: Color = board[row][col].toLowerCase() === board[row][col] ? 'b' : 'w';

      if (color !== turn) return;

      if (originCoords.row !== -1 && originCoords.col !== -1) hideMoves(originCoords, legalMoves);

      originCoords.row = row;
      originCoords.col = col;

      highlightMoves(originCoords, legalMoves);
   }

   const handleClickCell = (e: MouseEvent<HTMLDivElement>): void => {
      if (originCoords.row === -1 && originCoords.col === -1) return;

      const cell = e.currentTarget.closest('.cell') as HTMLDivElement;
      targetCoords.row = Number(cell.dataset.row)
      targetCoords.col = Number(cell.dataset.col);
      
      const moves: Coords[] = legalMoves.get(originCoords.row * RANKS + originCoords.col) ?? [];

      if (!canDrop(targetCoords, moves)) return;

      hideMoves(originCoords, legalMoves);
      removeHover(cell);
      dispatch(move(originCoords, targetCoords, board))
      resetCoords(originCoords, targetCoords);
   }

   const handleMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
      const cell = e.currentTarget as HTMLDivElement;

      const row: number = Number(cell.dataset.row);
      const col: number = Number(cell.dataset.col);

      const moves: Coords[] = legalMoves.get(originCoords.row * RANKS + originCoords.col) ?? [];

      if (moves.length === 0 || !canDrop({ row, col }, moves)) return;

      addHover(cell);
   }

   const handleMouseLeave = (e: MouseEvent<HTMLDivElement>): void => {
      if (originCoords.row === -1 && originCoords.col === -1) return;
   
      const cell = e.currentTarget as HTMLDivElement;

      removeHover(cell);
   }

   return (
      <S.Board>
         {
            board.map((rank: string[], rankIdx: number): JSX.Element[] => (
               rank.map((piece: string, fileIdx: number): JSX.Element => (
                  <S.Cell
                     key={rankIdx * FILES + fileIdx}
                     data-col = {`${fileIdx}`}
                     data-row = {`${rankIdx}`}
                     style={{
                        background: isCellBlack(rankIdx, fileIdx) ?
                           `${svar.clrCellBlack}` :
                           `${svar.clrCellWhite}`,
                        color: isCellBlack(rankIdx, fileIdx) ?
                           `${svar.clrCellWhite}` :
                           `${svar.clrCellBlack}`
                     }}
                     className='cell'
                     onDragOver={handleDragOver}
                     onDrop={handleDrop}
                     onDragEnter={handleDragEnter}
                     onDragLeave={handleDragLeave}
                     onClick={handleClickCell}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                  >
                     {fileIdx === FILES - 1 && <S.RankMark>{rankIdx + 1}</S.RankMark>}
                     {rankIdx === RANKS - 1 && <S.FileMark>{files[fileIdx]}</S.FileMark>}
                     {
                        piece !== '' && 
                           <S.Piece 
                              className='piece'
                              draggable={draggable(piece as Piece, turn)}
                              src={pieces[piece]} 
                              onDragStart={handleDragStart}
                              onClick={handleClickPiece}
                           />
                     }
                  </S.Cell>
               ))
            ))
         }
      </S.Board>
   )
}