import { Color, Piece, Coords } from "../components/board/board.slice"

type Moves = Record<'K' | 'Q' | 'R' | 'B' | 'N' | 'P', (origin: Coords, board: string[][], player: Color) => Coords[]>;

const constructCoords = (row: number, col: number): Coords => {
   return {
      row,
      col,
   }
}

const getPieceColor = (piece: Piece): Color => {
   return piece.toLowerCase() === piece ? 'b' : 'w';
}

const getMovesPawn = (origin: Coords, board: string[][], player: Color): Coords[] => {
   const pawnMoves: Coords[] = [];
   const { row, col }: Coords = origin;
   const pawnColor: Color = getPieceColor(board[row][col] as Piece);

   if (pawnColor === player) {
      if (board[row - 1][col] === '') pawnMoves.push(constructCoords(row - 1, col));
      if (row === 6 && board[row - 2][col] === '') pawnMoves.push(constructCoords(row - 2, col));
      if (board[row - 1][col - 1] && getPieceColor(board[row - 1][col - 1] as Piece) !== pawnColor) pawnMoves.push(constructCoords(row - 1, col - 1));
      if (board[row - 1][col + 1] && getPieceColor(board[row - 1][col + 1] as Piece) !== pawnColor) pawnMoves.push(constructCoords(row - 1, col + 1));
   }

   if (pawnColor !== player) {
      if (board[row + 1][col] === '') pawnMoves.push(constructCoords(row + 1, col));
      if (row === 1 && board[row + 2][col] === '') pawnMoves.push(constructCoords(row + 2, col));
      if (board[row + 1][col - 1] && getPieceColor(board[row + 1][col - 1] as Piece) !== pawnColor) pawnMoves.push(constructCoords(row + 1, col - 1));
      if (board[row + 1][col + 1] && getPieceColor(board[row + 1][col + 1] as Piece) !== pawnColor) pawnMoves.push(constructCoords(row + 1, col + 1));
   }

   return pawnMoves;
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

export function getLegalMoves(board: string[][], turn: Color, player: Color): Map<number, Coords[]> {
   const [rows, cols]: [number, number] = [board.length, board[0].length];
   const legalMoves: Map<number, Coords[]> = new Map();

   for (let i: number = 0; i < rows; i++) {
      for (let j: number = 0; j < cols; j++) {
         if (board[i][j] === '' || turn !== getPieceColor(board[i][j] as Piece)) continue;

         const origin: Coords = constructCoords(i, j);
         const pieceMoves: Coords[] = moves[board[i][j].toUpperCase() as keyof Moves](origin, board, player);

         legalMoves.set(i * cols + j, pieceMoves);
      }
   }

   return legalMoves;
}