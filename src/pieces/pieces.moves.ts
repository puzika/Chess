import { Color, Piece, Coords, Move } from "../components/board/board.slice"
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

const isValidMove = (move: Move, board: string[][]): boolean => {
   const { origin, target } = move;

   return (
      isOnBoard(target) &&
      (board[target.row][target.col] === '' || canTake(board[origin.row][origin.col], board[target.row][target.col]))
   )
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
   const rookMoves: Coords[] = [];
   const { row, col } = origin;
   let canMoveHorLeft: boolean = true;
   let canMoveHorRight: boolean = true;
   let canMoveVertUp: boolean = true;
   let canMoveVertDown: boolean = true;
   let idx: number = 1;

   while (canMoveHorLeft || canMoveHorRight || canMoveVertUp || canMoveVertDown) {
      if (canMoveHorLeft && isValidMove({ origin, target: {row, col: col - idx} }, board)) {
         rookMoves.push(constructCoords(row, col - idx));
         canMoveHorLeft = board[row][col - idx] === '';
      } else canMoveHorLeft = false;

      if (canMoveHorRight && isValidMove({ origin, target: {row, col: col + idx} }, board)) {
         rookMoves.push(constructCoords(row, col + idx));
         canMoveHorRight = board[row][col + idx] === '';
      } else canMoveHorRight = false;

      if (canMoveVertUp && isValidMove({ origin, target: {row: row - idx, col} }, board)) {
         rookMoves.push(constructCoords(row - idx, col));
         canMoveVertUp = board[row - idx][col] === '';
      } else canMoveVertUp = false;

      if (canMoveVertDown && isValidMove({ origin, target: {row: row + idx, col} }, board)) {
         rookMoves.push(constructCoords(row + idx, col));
         canMoveVertDown = board[row + idx][col] === '';
      } else canMoveVertDown = false;

      idx++;
   }

   return rookMoves;
}

const getMovesBishop = (origin: Coords, board: string[][]): Coords[] => {
   const bishopMoves: Coords[] = [];
   const { row, col } = origin;
   let canMoveLeftUp: boolean = true;
   let canMoveLeftDown: boolean = true;
   let canMoveRightUp: boolean = true;
   let canMoveRightDown: boolean = true;
   let idx: number = 1;

   while (canMoveLeftUp || canMoveLeftDown || canMoveRightUp || canMoveRightDown) {
      if (canMoveLeftUp && isValidMove({ origin, target: { row: row - idx, col: col - idx}}, board)) {
         bishopMoves.push(constructCoords(row - idx, col - idx));
         canMoveLeftUp = board[row - idx][col - idx] === '';
      } else canMoveLeftUp = false;

      if (canMoveLeftDown && isValidMove({ origin, target: { row: row + idx, col: col - idx}}, board)) {
         bishopMoves.push(constructCoords(row + idx, col - idx));
         canMoveLeftDown = board[row + idx][col - idx] === '';
      } else canMoveLeftDown = false;

      if (canMoveRightUp && isValidMove({ origin, target: { row: row - idx, col: col + idx}}, board)) {
         bishopMoves.push(constructCoords(row - idx, col + idx));
         canMoveRightUp = board[row - idx][col + idx] === '';
      } else canMoveRightUp = false;

      if (canMoveRightDown && isValidMove({ origin, target: { row: row + idx, col: col + idx}}, board)) {
         bishopMoves.push(constructCoords(row + idx, col + idx));
         canMoveRightDown = board[row + idx][col + idx] === '';
      } else canMoveRightDown = false;

      idx++;
   }

   return bishopMoves;
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