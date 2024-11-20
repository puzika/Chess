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
      
      originCoords.row = Number(cell.dataset.row);
      originCoords.col = Number(cell.dataset.col);

      console.log(legalMoves);
   }

   const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
   } 

   const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
      if (!e.currentTarget.classList.contains('cell')) return;

      const cell = e.currentTarget as HTMLDivElement;

      targetCoords.row = Number(cell.dataset.row);
      targetCoords.col = Number(cell.dataset.col);

      if (targetCoords.row === originCoords.row && targetCoords.col === originCoords.col) {
         resetCoords(originCoords, targetCoords);
         return;
      }

      dispatch(move(originCoords, targetCoords, board));

      resetCoords(originCoords, targetCoords);
   }

   const handleClickPiece = (e: MouseEvent<HTMLImageElement>): void => {
      const cell = e.currentTarget.parentElement as HTMLDivElement;
      const row: number = Number(cell.dataset.row);
      const col: number = Number(cell.dataset.col);

      const color: Color = board[row][col].toLowerCase() === board[row][col] ? 'b' : 'w';

      if (color !== turn) return;

      originCoords.row = row;
      originCoords.col = col;
   }

   const handleClickCell = (e: MouseEvent<HTMLDivElement>): void => {
      if (originCoords.row === -1 && originCoords.col === -1) return;

      const cell = e.currentTarget.closest('.cell') as HTMLDivElement;
      const row: number = Number(cell.dataset.row); 
      const col: number = Number(cell.dataset.col);
      
      if (board[row][col] !== '') {
         const color: Color = board[row][col].toLowerCase() === board[row][col] ? 'b' : 'w';

         if (turn === color) return;
      }

      targetCoords.row = row;
      targetCoords.col = col;

      dispatch(move(originCoords, targetCoords, board))

      resetCoords(originCoords, targetCoords);
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
                     onClick={handleClickCell}
                  >
                     <S.RankMark>{fileIdx === FILES - 1 && rankIdx + 1}</S.RankMark>
                     <S.FileMark>{rankIdx === RANKS - 1 && files[fileIdx]}</S.FileMark>
                     {
                        piece !== '' && 
                           <S.Piece 
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