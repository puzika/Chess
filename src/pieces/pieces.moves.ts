import { Color, Piece, Coords } from "../components/board/board.slice"

type Moves = Record<Exclude<Piece, 'p' | 'r' | 'b' | 'n' | 'q' | 'k'>, (origin: Coords, board: string[][]) => Coords[]>;

const constructCoords = (row: number, col: number): Coords => {
   return {
      row,
      col,
   }
}

const getPieceColor = (piece: Piece): Color => {
   return piece.toLowerCase() === piece ? 'b' : 'w';
}

const getMovesPawn = (origin: Coords, board: string[][]): Coords[] => {
   const moves: Coords[] = [];
   const pieceColor: Color = getPieceColor(board[origin.row][origin.col] as Piece);

   const canCapture = (targetRow: number, targetCol: number): boolean => {
      if (!board[targetRow][targetCol]) return false;

      const targetPiece = board[targetRow][targetCol] as Piece;
      const targetPieceColor: Color = getPieceColor(targetPiece);

      return targetPieceColor !== pieceColor;
   }

   if (pieceColor === 'w') {
      if (board[origin.row - 1][origin.col] === '') {
         const moveForward: Coords = constructCoords(origin.row - 1, origin.col);
         moves.push(moveForward);
      }

      if (origin.row === 6 && board[origin.row - 2][origin.col] === '') {
         const doubleMoveForward: Coords = constructCoords(origin.row - 2, origin.col);
         moves.push(doubleMoveForward);
      }

      if (canCapture(origin.row - 1, origin.col - 1)) {
         const capture: Coords = constructCoords(origin.row - 1, origin.col - 1);
         moves.push(capture);
      }

      if (canCapture(origin.row - 1, origin.col + 1)) {
         const capture: Coords = constructCoords(origin.row - 1, origin.col + 1);
         moves.push(capture);
      }
   } else {
      if (board[origin.row + 1][origin.col] === '') {
         const moveForward: Coords = constructCoords(origin.row + 1, origin.col);
         moves.push(moveForward);
      }

      if (origin.row === 1 && board[origin.row + 2][origin.col] === '') {
         const doubleMoveForward: Coords = constructCoords(origin.row + 2, origin.col);
         moves.push(doubleMoveForward);
      }

      if (canCapture(origin.row + 1, origin.col - 1)) {
         const capture: Coords = constructCoords(origin.row + 1, origin.col - 1);
         moves.push(capture);
      }

      if (canCapture(origin.row + 1, origin.col + 1)) {
         const capture: Coords = constructCoords(origin.row + 1, origin.col + 1);
         moves.push(capture);
      }
   }

   return moves;
}

const getMovesRook = (origin: Coords, board: string[][]): Coords[] => {
   return [];
}

const getMovesBishop = (origin: Coords, board: string[][]): Coords[] => {
   return [];
}

const getMovesKnight = (origin: Coords, board: string[][]): Coords[] => {
   return [];
}

const getMovesQueen = (origin: Coords, board: string[][]): Coords[] => {
   return [];
}

const getMovesKing = (origin: Coords, board: string[][]): Coords[] => {
   return [];
}

const moves: Moves = {
   P: getMovesPawn,
   R: getMovesRook,
   B: getMovesBishop,
   N: getMovesKnight,
   Q: getMovesQueen,
   K: getMovesKing,
}

export function getLegalMoves(board: string[][], turn: Color): Map<number, Coords[]> {
   const [rows, cols]: [number, number] = [board.length, board[0].length];
   const legalMoves: Map<number, Coords[]> = new Map();

   for (let i: number = 0; i < rows; i++) {
      for (let j: number = 0; j < cols; j++) {
         if (board[i][j] === '' || turn !== getPieceColor(board[i][j] as Piece)) continue;

         const origin: Coords = constructCoords(i, j);
         const pieceMoves: Coords[] = moves[board[i][j].toUpperCase() as keyof Moves](origin, board);

         legalMoves.set(i * cols + j, pieceMoves);
      }
   }

   return legalMoves;
}