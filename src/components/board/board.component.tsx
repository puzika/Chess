import { DragEvent, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectPosition, selectTurn, move } from './board.slice';
import type { Color, Coords, Piece } from './board.slice';
import WhiteKing from '../../assets/king-w.svg';
import WhiteQueen from '../../assets/queen-w.svg';
import WhiteRook from '../../assets/rook-w.svg';
import WhiteBishop from '../../assets/bishop-w.svg';
import WhiteKnight from '../../assets/knight-w.svg';
import WhitePawn from '../../assets/pawn-w.svg';
import BlackKing from '../../assets/king-b.svg';
import BlackQueen from '../../assets/queen-b.svg';
import BlackRook from '../../assets/rook-b.svg';
import BlackBishop from '../../assets/bishop-b.svg';
import BlackKnight from '../../assets/knight-b.svg';
import BlackPawn from '../../assets/pawn-b.svg';
import * as S from './board.style';
import * as svar from '../../variables.style';

const RANKS: number = 8;
const FILES: number = 8;

const files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

interface Pieces {
   [key: string]: string,
}

const pieces: Pieces = {
   'K': WhiteKing,
   'Q': WhiteQueen,
   'R': WhiteRook,
   'B': WhiteBishop,
   'N': WhiteKnight,
   'P': WhitePawn,
   'k': BlackKing,
   'q': BlackQueen,
   'r': BlackRook,
   'b': BlackBishop,
   'n': BlackKnight,
   'p': BlackPawn,
}

const isBlack = (rankIdx: number, fileIdx: number): boolean => {
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
   
   const originCoords: Coords = { row: -1, col: -1 };
   const targetCoords: Coords = { row: -1, col: -1 };

   const handleDragStart = (e: DragEvent<HTMLImageElement>): void => {
      const cell = e.currentTarget.parentElement as HTMLDivElement;
      
      originCoords.row = Number(cell.dataset.row);
      originCoords.col = Number(cell.dataset.col);
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
                        background: isBlack(rankIdx, fileIdx) ?
                           `${svar.clrCellBlack}` :
                           `${svar.clrCellWhite}`,
                        color: isBlack(rankIdx, fileIdx) ?
                           `${svar.clrCellWhite}` :
                           `${svar.clrCellBlack}`
                     }}
                     className='cell'
                     onDragOver={handleDragOver}
                     onDrop={handleDrop}
                  >
                     <S.RankMark>{fileIdx === FILES - 1 && rankIdx + 1}</S.RankMark>
                     <S.FileMark>{rankIdx === RANKS - 1 && files[fileIdx]}</S.FileMark>
                     {
                        piece !== '' && 
                           <S.Piece 
                              draggable={draggable(piece as Piece, turn)}
                              src={pieces[piece]} 
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