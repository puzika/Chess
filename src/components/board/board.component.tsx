import { DragEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectPosition, selectCastling, selectEnpassant, selectTurn, selectHalfMove, selectFullMove, move } from './board.slice';
import type { Coords } from './board.slice';
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

export default function Board() {
   const dispatch = useAppDispatch();
   const position: string = useAppSelector(selectPosition);
   const turn = useAppSelector(selectTurn);
   const castling = useAppSelector(selectCastling);
   const enpassant = useAppSelector(selectEnpassant);
   const halfmove = useAppSelector(selectHalfMove);
   const fullmove = useAppSelector(selectFullMove);

   console.log(position, turn, castling, enpassant, halfmove, fullmove);

   const board: string[][] = generatePosition(position);
   
   let dragged: HTMLImageElement | null = null;
   const originCoords: Coords = { row: -1, col: -1 };
   const targetCoords: Coords = { row: -1, col: -1 };

   const dragStart = (e: DragEvent<HTMLImageElement>): void => {
      dragged = e.currentTarget;
      
      const cell = e.currentTarget.parentElement as HTMLDivElement;
      
      originCoords.row = Number(cell.dataset.row);
      originCoords.col = Number(cell.dataset.col);
   }

   const dragOver = (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
   } 

   const drop = (e: DragEvent<HTMLDivElement>): void => {
      if (!e.currentTarget.classList.contains('cell')) return;

      const cell = e.currentTarget as HTMLDivElement;

      targetCoords.row = Number(cell.dataset.row);
      targetCoords.col = Number(cell.dataset.col);

      if (targetCoords.row === originCoords.row && targetCoords.col === originCoords.col) return;

      dispatch(move(originCoords, targetCoords, board));
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
                     onDragOver={dragOver}
                     onDrop={drop}
                  >
                     <S.RankMark>{fileIdx === FILES - 1 && rankIdx + 1}</S.RankMark>
                     <S.FileMark>{rankIdx === RANKS - 1 && files[fileIdx]}</S.FileMark>
                     {
                        piece !== '' && 
                           <S.Piece 
                              src={pieces[piece]} 
                              onDragStart={dragStart}
                              />
                     }
                  </S.Cell>
               ))
            ))
         }
      </S.Board>
   )
}