import WhiteKing from '../assets/king-w.svg';
import WhiteQueen from '../assets/queen-w.svg';
import WhiteRook from '../assets/rook-w.svg';
import WhiteBishop from '../assets/bishop-w.svg';
import WhiteKnight from '../assets/knight-w.svg';
import WhitePawn from '../assets/pawn-w.svg';
import BlackKing from '../assets/king-b.svg';
import BlackQueen from '../assets/queen-b.svg';
import BlackRook from '../assets/rook-b.svg';
import BlackBishop from '../assets/bishop-b.svg';
import BlackKnight from '../assets/knight-b.svg';
import BlackPawn from '../assets/pawn-b.svg';

interface Pieces {
   [key: string]: string,
}

export const pieces: Pieces = {
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