import { Color, Piece, Coords } from "../components/board/board.slice"
import { getIdxFromCoords } from "../components/board/board.utils";

type Moves = Record<'K' | 'Q' | 'R' | 'B' | 'N' | 'P', (origin: Coords, board: string[][], player: Color) => Coords[]>;

const constructCoords = (row: number, col: number): Coords => {
   return {
      row,
      col,
   }
}

export const getPieceColor = (piece: Piece): Color => {
   return piece.toLowerCase() === piece ? 'b' : 'w';
}

const canTake = (piece1: string, piece2: string): boolean => {
   return getPieceColor(piece1 as Piece) !== getPieceColor(piece2 as Piece);
}

const isOnBoard = (target: Coords): boolean => {
   return (
      target.row < 8 &&
      target.row >= 0 &&
      target.col < 8 &&
      target.col >= 0
   );
}

const getMovesPawn = (origin: Coords, board: string[][], player: Color): Coords[] => {
   const pawnMoves: Coords[] = [];
   const { row, col }: Coords = origin;
   const pawnColor: Color = getPieceColor(board[row][col] as Piece);

   if (pawnColor === player) {
      if (board[row - 1][col] === '') pawnMoves.push(constructCoords(row - 1, col));
      if (row === 6 && board[row - 2][col] === '') pawnMoves.push(constructCoords(row - 2, col));
      if (board[row - 1][col - 1] && canTake(board[row - 1][col - 1], board[row][col])) pawnMoves.push(constructCoords(row - 1, col - 1));
      if (board[row - 1][col + 1] && canTake(board[row - 1][col + 1], board[row][col])) pawnMoves.push(constructCoords(row - 1, col + 1));
   }

   if (pawnColor !== player) {
      if (board[row + 1][col] === '') pawnMoves.push(constructCoords(row + 1, col));
      if (row === 1 && board[row + 2][col] === '') pawnMoves.push(constructCoords(row + 2, col));
      if (board[row + 1][col - 1] && canTake(board[row + 1][col - 1], board[row][col])) pawnMoves.push(constructCoords(row + 1, col - 1));
      if (board[row + 1][col + 1] && canTake(board[row + 1][col + 1], board[row][col])) pawnMoves.push(constructCoords(row + 1, col + 1));
   }

   return pawnMoves;
}

const getMovesRook = (origin: Coords, board: string[][]): Coords[] => {
   const [rows, cols] = [board.length, board[0].length];
   const rookMoves: Coords[] = [];
   const { row, col } = origin;
   let canMoveHorLeft: boolean = true;
   let canMoveHorRight: boolean = true;
   let canMoveVertUp: boolean = true;
   let canMoveVertDown: boolean = true;
   let idx: number = 1;

   while (canMoveHorLeft || canMoveHorRight || canMoveVertUp || canMoveVertDown) {
      if (canMoveHorLeft && isOnBoard({row, col: col - idx})) {
         if (board[row][col - idx] === '') rookMoves.push(constructCoords(row, col - idx));
         else if (canTake(board[row][col], board[row][col - idx])) {
            rookMoves.push(constructCoords(row, col - idx));
            canMoveHorLeft = false;
         } else canMoveHorLeft = false;
      } else canMoveHorLeft = false;

      if (canMoveHorRight && isOnBoard({row, col: col + idx})) {
         if (board[row][col + idx] === '') rookMoves.push(constructCoords(row, col + idx));
         else if (canTake(board[row][col], board[row][col + idx])) {
            rookMoves.push(constructCoords(row, col + idx));
            canMoveHorRight = false;
         } else canMoveHorRight = false;
      } else {
         canMoveHorRight = false;
      }

      if (canMoveVertUp && isOnBoard({row: row - idx, col})) {
         if (board[row - idx][col] === '') rookMoves.push(constructCoords(row - idx, col));
         else if (canTake(board[row][col], board[row - idx][col])) {
            rookMoves.push(constructCoords(row - idx, col));
            canMoveVertUp = false;
         } else canMoveVertUp = false;
      } else {
         canMoveVertUp = false;
      }

      if (canMoveVertDown && isOnBoard({row: row + idx, col})) {
         if (board[row + idx][col] === '') rookMoves.push(constructCoords(row + idx, col));
         else if (canTake(board[row][col], board[row + idx][col])) {
            rookMoves.push(constructCoords(row + idx, col));
            canMoveVertDown = false;
         } else canMoveVertDown = false;
      } else {
         canMoveVertDown = false;
      }

      idx++;
   }

   return rookMoves;
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

export function getLegalMoves(board: string[][], turn: Color, player: Color): Map<number, Coords[]> {
   const [rows, cols]: [number, number] = [board.length, board[0].length];
   const legalMoves: Map<number, Coords[]> = new Map();

   for (let i: number = 0; i < rows; i++) {
      for (let j: number = 0; j < cols; j++) {
         if (board[i][j] === '' || turn !== getPieceColor(board[i][j] as Piece)) continue;

         const origin: Coords = constructCoords(i, j);
         const pieceMoves: Coords[] = moves[board[i][j].toUpperCase() as keyof Moves](origin, board, player);

         legalMoves.set(getIdxFromCoords(origin), pieceMoves);
      }
   }

   return legalMoves;
}